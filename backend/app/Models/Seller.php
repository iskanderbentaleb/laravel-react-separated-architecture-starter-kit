<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;

class Seller extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens, MustVerifyEmailTrait;

    protected $appends = ['role', 'profile_photo_url', 'two_factor_setup_pending'];
    
    public function getRoleAttribute(){
        return 'seller';
    }

    public function getProfilePhotoUrlAttribute()
    {
        return $this->profile_photo_path ? asset('storage/' . $this->profile_photo_path) : null;
    }

    public function getTwoFactorSetupPendingAttribute()
    {
        return ! $this->two_factor_enabled
            && ! empty($this->two_factor_code)
            && $this->two_factor_expires_at
            && now()->lessThan($this->two_factor_expires_at);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'profile_photo_path',
        'two_factor_enabled',
        'two_factor_code',
        'two_factor_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'two_factor_enabled' => 'boolean',
        'two_factor_expires_at' => 'datetime',
        'password' => 'hashed',
    ];

}
