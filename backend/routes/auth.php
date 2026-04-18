<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Socialite;

// set laguages // put paramerter of like : /login?locale=fr
Route::middleware(['locale'])->group(function () {

    // just for test
    Route::get('/test-language', function () {
            return response()->json(['message' => __('messages.welcome')]);
    });
    // just for test

    Route::post('/register', [RegisteredUserController::class, 'store'])
                    ->middleware('guest')
                    ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                    ->middleware('guest')
                    ->name('login');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.store');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                    ->middleware(['auth:web,seller', 'signed', 'throttle:6,1'])
                    ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                    ->middleware(['auth:web,seller', 'throttle:6,1'])
                    ->name('verification.send');


    Route::middleware(['auth:sanctum,seller'])->group(function () {
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');
    });


    Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);



});

