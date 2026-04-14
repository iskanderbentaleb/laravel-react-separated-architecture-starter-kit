<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Notifications\TwoFactorCodeNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:sellers,email,' . $user->id],
            'phone' => ['nullable', 'string', 'max:20'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:5120'],
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }

            $validated['profile_photo_path'] = $request->file('avatar')->store('sellers', 'public');
        }

        if ($validated['email'] !== $user->email) {
            $user->email_verified_at = null;
        }

        $user->fill($validated);
        $user->save();

        return response()->json([
            'message' => __('messages.admin.profile_updated_successfully'),
            'user' => $user,
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8'],
            'confirm_password' => ['required', 'string', 'same:new_password'],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => __('messages.admin.current_password_incorrect')], 422);
        }

        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json(['message' => __('messages.admin.password_changed_successfully')]);
    }

    public function toggleTwoFactor(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'enabled' => ['required', 'boolean'],
        ]);

        if ($validated['enabled'] && ! $user->email_verified_at) {
            return response()->json([
                'message' => __('messages.admin.two_factor_requires_verified_email'),
            ], 422);
        }

        if ($validated['enabled']) {
            $user->two_factor_enabled = false;
            $this->sendTwoFactorCode($user);
            $message = __('messages.admin.two_factor_code_sent');
        } else {
            $user->two_factor_enabled = false;
            $user->two_factor_code = null;
            $user->two_factor_expires_at = null;
            $message = __('messages.admin.two_factor_disabled');
        }

        $user->save();

        return response()->json([
            'message' => $message,
            'user' => $user,
        ]);
    }

    public function sessions(Request $request)
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();

        $sessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderBy('last_activity', 'desc')
            ->get()
            ->map(function ($session) use ($currentSessionId) {
                $lastActive = Carbon::createFromTimestamp($session->last_activity);

                return [
                    'id' => $session->id,
                    'ip_address' => $session->ip_address,
                    'user_agent' => $session->user_agent,
                    'user_agent_readable' => $this->getReadableUserAgent($session->user_agent),
                    'last_active' => $lastActive->toIso8601String(),
                    'last_active_readable' => $lastActive->format('M d, Y H:i:s'),
                    'current' => $session->id === $currentSessionId,
                ];
            });

        return response()->json(['sessions' => $sessions]);
    }

    public function logoutOtherSessions(Request $request)
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();
        $currentToken = null;

        if ($request->bearerToken()) {
            $currentToken = \Laravel\Sanctum\PersonalAccessToken::findToken($request->bearerToken());
        }

        DB::table('sessions')
            ->where('user_id', $user->id)
            ->where('id', '!=', $currentSessionId)
            ->delete();

        $tokenQuery = DB::table('personal_access_tokens')
            ->where('tokenable_type', User::class)
            ->where('tokenable_id', $user->id);

        if ($currentToken) {
            $tokenQuery->where('id', '!=', $currentToken->id);
        }

        $tokenQuery->delete();

        return response()->json(['message' => __('messages.admin.logged_out_other_devices')]);
    }

    public function sendEmailVerification(Request $request)
    {
        $user = $request->user();

        if ($user->email_verified_at) {
            return response()->json(['message' => __('messages.admin.email_already_verified')], 200);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => __('messages.admin.verification_email_sent')]);
    }

    public function verifyTwoFactor(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'code' => ['required', 'string', 'size:6'],
        ]);

        $user = Seller::where('email', $validated['email'])->first();

        if (! $user || (! $user->two_factor_enabled && ! $user->two_factor_code)) {
            return response()->json(['message' => __('messages.admin.invalid_two_factor_request')], 422);
        }

        if ($user->two_factor_expires_at === null || now()->greaterThan($user->two_factor_expires_at)) {
            return response()->json(['message' => __('messages.admin.two_factor_code_expired')], 422);
        }

        if ($user->two_factor_code !== $validated['code']) {
            return response()->json(['message' => __('messages.admin.two_factor_code_invalid')], 422);
        }

        $wasEnabled = $user->two_factor_enabled;
        $user->two_factor_code = null;
        $user->two_factor_expires_at = null;

        if (! $wasEnabled) {
            $user->two_factor_enabled = true;
        }

        $user->save();

        $response = ['user' => $user];
        if ($wasEnabled) {
            $response['token'] = $user->createToken('api', [$user->role])->plainTextToken;
        }

        return response()->json($response);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'password' => ['required', 'string'],
        ]);

        if (! Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => __('messages.admin.delete_password_incorrect')], 422);
        }

        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $user->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $user->delete();

        return response()->json(['message' => __('messages.admin.account_permanently_deleted')]);
    }

    protected function getReadableUserAgent(?string $userAgent): string
    {
        if (! $userAgent) {
            return 'Unknown device';
        }

        $browser = 'Unknown browser';
        if (preg_match('/OPR\\//i', $userAgent) || preg_match('/Opera/i', $userAgent)) {
            $browser = 'Opera';
        } elseif (preg_match('/Edg(e|A|iOS)?\\//i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/Chrome\\//i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Firefox\\//i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Safari\\//i', $userAgent) && preg_match('/Version\\//i', $userAgent)) {
            $browser = 'Safari';
        }

        $platform = 'Unknown OS';
        if (preg_match('/Macintosh/i', $userAgent)) {
            $platform = 'macOS';
        } elseif (preg_match('/Windows NT/i', $userAgent)) {
            $platform = 'Windows';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $platform = 'Android';
        } elseif (preg_match('/iPhone|iPad|iPod/i', $userAgent)) {
            $platform = 'iOS';
        } elseif (preg_match('/Linux/i', $userAgent)) {
            $platform = 'Linux';
        }

        return sprintf('%s on %s', $browser, $platform);
    }

    protected function sendTwoFactorCode(Seller $seller): void
    {
        $code = (string) rand(100000, 999999);
        $seller->two_factor_code = $code;
        $seller->two_factor_expires_at = now()->addMinutes(10);
        $seller->save();

        $seller->notify(new TwoFactorCodeNotification($code));
    }
}
