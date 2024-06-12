<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
    //  * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     return $next($request);
    // }
    public function handle($request, Closure $next, ...$roles)
    {
        $user = auth()->user();

        if ($user && in_array($user->role_id, $roles)) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
