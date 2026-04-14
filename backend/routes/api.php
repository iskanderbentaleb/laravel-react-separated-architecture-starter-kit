<?php

use App\Http\Controllers\Api\Admin\AdminProfileController;
use App\Http\Controllers\Api\Seller\SellerController;
use Illuminate\Support\Facades\Route;

Route::post('admin/two-factor/verify', [AdminProfileController::class, 'verifyTwoFactor']);

Route::middleware(['auth:sanctum' , 'ability:admin'])->prefix('admin')->group(static function(){

    Route::get('/', [AdminProfileController::class, 'show']);
    Route::patch('/profile', [AdminProfileController::class, 'update']);
    Route::post('/password', [AdminProfileController::class, 'changePassword']);
    Route::post('/two-factor', [AdminProfileController::class, 'toggleTwoFactor']);
    Route::post('/email/verification-notification', [AdminProfileController::class, 'sendEmailVerification']);
    Route::get('/sessions', [AdminProfileController::class, 'sessions']);
    Route::post('/logout-other-sessions', [AdminProfileController::class, 'logoutOtherSessions']);
    Route::delete('/profile', [AdminProfileController::class, 'destroy']);

});

Route::post('seller/two-factor/verify', [SellerController::class, 'verifyTwoFactor']);

// and all about the sellers constrollers
Route::middleware(['auth:sanctum' , 'ability:seller'])->prefix('seller')->group(static function(){
    Route::get('/', [SellerController::class, 'index']);
    Route::patch('/profile', [SellerController::class, 'update']);
    Route::post('/password', [SellerController::class, 'changePassword']);
    Route::post('/two-factor', [SellerController::class, 'toggleTwoFactor']);
    Route::post('/email/verification-notification', [SellerController::class, 'sendEmailVerification']);
    Route::get('/sessions', [SellerController::class, 'sessions']);
    Route::post('/logout-other-sessions', [SellerController::class, 'logoutOtherSessions']);
    Route::delete('/profile', [SellerController::class, 'destroy']);
});






