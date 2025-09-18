<?php
namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Blog;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users_count' => User::where('role', 'user')->count(),
                'subadmins_count' => User::where('role', 'sub_admin')->count(),
                'blogs_count' => Blog::count(),
            ]
        ]);
    }
}