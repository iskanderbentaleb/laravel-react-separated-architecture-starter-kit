<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Define your guards and their corresponding brokers
        $guardConfigs = [
            'web' => [
                'broker' => 'users',
                'model' => \App\Models\User::class,
            ],
            'seller' => [
                'broker' => 'sellers',
                'model' => \App\Models\Seller::class,
            ],
        ];

        $broker = null;

        // Find which broker to use based on email
        foreach ($guardConfigs as $guard => $config) {
            $model = $config['model'];
            $user = $model::where('email', $request->email)->first();

            if ($user) {
                $broker = $config['broker'];
                break;
            }
        }

        if (!$broker) {
            throw ValidationException::withMessages([
                'email' => [__('passwords.user')],
            ]);
        }

        // Attempt to reset the user's password
        $status = Password::broker($broker)->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();

                // Delete all tokens for this user if using Sanctum
                if (method_exists($user, 'tokens')) {
                    $user->tokens()->delete();
                }
            }
        );

        if ($status != Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'status' => __($status),
            'message' => 'Password reset successfully'
        ]);
    }
}
