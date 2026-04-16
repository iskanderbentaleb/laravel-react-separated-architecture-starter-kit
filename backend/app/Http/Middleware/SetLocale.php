<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the request has a locale parameter
        $locale = $request->header('X-Locale', $request->query('locale', config('app.locale')));

        // Validate the locale
        if (!in_array($locale, ['en', 'fr', 'ar' ])) {
            return response()->json(['error' => 'Unsupported locale'], 400);
        }

        // Set the locale
        App::setLocale($locale);

        return $next($request);
    }
}
