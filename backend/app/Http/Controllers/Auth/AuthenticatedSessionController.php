<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Notifications\TwoFactorCodeNotification;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Authenticate the user using the provided credentials
        $request->authenticate();

        $user = null;

        $guards = array_keys(config('auth.guards'));

        foreach ($guards as $guard) {
            $currentGuard = Auth::guard($guard);
            if ($currentGuard->check()) {
                $user = $currentGuard->user();
                break;
            }
        }

        if (!$user) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }

        $request->session()->regenerate();

        if ($user->two_factor_enabled && $user->email_verified_at) {
            $this->sendTwoFactorCode($user);

            return response()->json([
                'two_factor_required' => true,
                'message' => 'A verification code has been sent to your email.',
                'user' => [
                    'email' => $user->email,
                    'role' => $user->getRoleAttribute(),          
                ],
            ]);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('api', [$user->getRoleAttribute()])->plainTextToken,
        ]);
    }

    /**
     * Send the two-factor authentication code to the user.
    */ 

    protected function sendTwoFactorCode(Authenticatable $user): void
    {
        $code = (string) rand(100000, 999999);
        $user->two_factor_code = $code;
        $user->two_factor_expires_at = now()->addMinutes(10);
        $user->save();

        $user->notify(new TwoFactorCodeNotification($code));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
    // Logout from the 'web' guard
    Auth::guard('web')->logout();

    // Get all guard names from the config
    $guards = array_keys(config('auth.guards'));

    // Loop through each guard and logout if authenticated
    foreach ($guards as $guard) {
        $currentGuard = Auth::guard($guard);
        if ($currentGuard->check()) {
            $user = $currentGuard->user();
            break;
        }
    }

    if ($user) {
        $user->tokens()->delete();
    }

    // Invalidate the session and regenerate the CSRF token
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    // Return a no-content response
    return response()->noContent();
    }
}
