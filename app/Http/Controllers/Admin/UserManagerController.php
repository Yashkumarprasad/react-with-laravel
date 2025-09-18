<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserManagerController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'user')->paginate(10)->withQueryString();
        $users->links = view('pagination::default', ['paginator' => $users])->render();

        return Inertia::render('Admin/Users/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $r)
    {
        $r->validate([
            'name' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->where(function ($query) {
                    return $query->where('role', 'user')
                        ->whereNull('deleted_at');
                }),
            ],
            'password' => 'required|min:6|confirmed'
        ]);

        User::create([
            'name' => $r->name,
            'email' => $r->email,
            'role' => 'user',
            'password' => Hash::make($r->password)
        ]);
        return redirect()->route('admin.users.index')->with('success', 'User created successfully!');

    }

    public function edit($id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        return Inertia::render('Admin/Users/Edit', compact('user'));
    }

    public function update(Request $r, $id)
    {
        $user = User::findOrFail($id);
        $r->validate(
            [
                'name' => 'required',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users', 'email')->where(function ($query) use ($user) {
                        return $query->where('role', 'user')
                            ->where('id', '!=', $user->id)
                            ->whereNull('deleted_at');
                    }),
                ],
            ]
        );
        $user->update($r->only('name', 'email'));
        if ($r->filled('password')) {
            $r->validate(['password' => 'min:6|confirmed']);
            $user->password = Hash::make($r->password);
            $user->save();
        }
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully!');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully!');
    }
}