<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
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

        $user = null;
        $broker = null;

        // Find which guard the user belongs to
        foreach ($guardConfigs as $guard => $config) {
            $model = $config['model'];
            $foundUser = $model::where('email', $request->email)->first();

            if ($foundUser) {
                $user = $foundUser;
                $broker = $config['broker'];
                break;
            }
        }

        if (!$user) {
            // If no user found, still return success to prevent email enumeration
            return response()->json([
                'status' => __('passwords.sent')
            ]);
        }

        // Send password reset link using the appropriate broker
        $status = Password::broker($broker)->sendResetLink(
            ['email' => $request->email]
        );

        if ($status != Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'status' => __($status),
            'email' => $request->email,
            'broker' => $broker
        ]);
    }
}
