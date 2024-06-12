<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::truncate();

        // Tạo dữ liệu mới
        User::create([
            'name' => 'Le Viet Tho',
            'email' => 'leviettho0611@gmail.com',
            'password' => bcrypt(123123),
        ]);

        User::create([
            'name' => 'My Linh',
            'email' => 'mylinh@gmail.com',
            'password' => bcrypt(123123),
        ]);
        User::create([
            'name' => 'Dac Thinh',
            'email' => 'dacthinh@gmail.com',
            'password' => bcrypt(123123),
        ]);
        User::create([
            'name' => 'Hao Kiet',
            'email' => 'haokiet@gmail.com',
            'password' => bcrypt(123123),
        ]);
    }
}
