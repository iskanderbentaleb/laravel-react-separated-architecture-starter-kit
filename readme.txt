------------ how to add google oauth to laravel with spa -----------------
video : https://www.youtube.com/watch?v=lWqJgqzN7cM

1) go to : https://console.cloud.google.com/ 
2) search for 'create project' / put project name 
3) on topbar select app that we created then search 'oauth consent screen' click it then start fill info ( external service )
4) then give us our secret info after created ( client app ) in our case i select webapp
    CLIENT_ID / CLIENT_SECRET
5) install package : 
    composer require laravel/socialite

6) we add to .env :
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=/auth/google/callback

7) add routes :
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

8) add this to config/services.php :
    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
    ],

9) then we add controller : 
    php artisan make:controller GoogleAuthController
    note : i move it folder auth 
    then we add fucntion and import controller in auth.php (routes )

10) then we add migration : 
    php artisan make:migration add_google_id_field_to_users_table
    and we add google_id to this migration

11 ) then we add google_id to model in $fillable and $hidden

12 ) then create Route and OauthSuccess.jsx file in fronent to redirect user to dashbord