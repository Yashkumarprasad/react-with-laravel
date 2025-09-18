<?php
namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();
        if (!$user)
            return redirect()->route('admin.login');
        if (!in_array(optional($user->role)->name, $roles)) {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}