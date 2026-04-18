<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $avatar = $googleUser->getAvatar();
        $avatar = str_replace('=s96-c', '=s256-c', $avatar);

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'profile_photo_path' => $avatar,
                'email_verified_at' => now(),
                'password' => Hash::make(Str::password(15)),
            ]
        );

        Auth::login($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return redirect( config('app.frontend_url')."/oauth-success?token=".$token ."&role=".$user->getRoleAttribute());
    }
}
