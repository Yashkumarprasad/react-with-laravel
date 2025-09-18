<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        $super = Role::firstOrCreate(['name' => 'super_admin']);
        $sub = Role::firstOrCreate(['name' => 'sub_admin']);


        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'role' => 'super_admin',
                'password' => Hash::make('password'),
                'role_id' => $super->id,
            ]
        );


        User::firstOrCreate(
            ['email' => 'subadmin@example.com'],
            [
                'name' => 'Sub Admin',
                'role' => 'sub_admin',
                'password' => Hash::make('password'),
                'role_id' => $sub->id,
            ]
        );
    }
}