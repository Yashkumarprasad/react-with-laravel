<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class SubAdminController extends Controller
{
    public function __construct()
    {
        // Only super_admin can create/delete/edit sub-admins
        $this->middleware('admin.role:super_admin')->except(['index']);
    }

    public function index()
    {
        $subRole = Role::where('name', 'sub_admin')->first();
        $subadmins = $subRole ? User::where('role_id', $subRole->id)->get() : collect();
        return Inertia::render('Admin/SubAdmins/Index', ['subadmins' => $subadmins]);
    }

    public function create()
    {
        return Inertia::render('Admin/SubAdmins/Create');
    }

    public function store(Request $r)
    {
        $role = Role::where('name', 'sub_admin')->firstOrFail();
        $r->validate(['name' => 'required', 'email' => 'required|email|unique:users', 'password' => 'required|min:6']);
        User::create([
            'name' => $r->name,
            'email' => $r->email,
            'password' => Hash::make($r->password),
            'role_id' => $role->id,
        ]);
        return redirect()->route('admin.sub-admins.index');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Admin/SubAdmins/Edit', ['user' => $user]);
    }

    public function update(Request $r, $id)
    {
        $user = User::findOrFail($id);
        $r->validate(['name' => 'required', 'email' => 'required|email|unique:users,email,' . $user->id]);
        $user->update($r->only('name', 'email'));
        if ($r->filled('password')) {
            $r->validate(['password' => 'min:6']);
            $user->password = Hash::make($r->password);
            $user->save();
        }
        return redirect()->route('admin.sub-admins.index');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.sub-admins.index');
    }
}