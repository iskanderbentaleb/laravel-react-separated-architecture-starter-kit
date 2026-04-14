<?php

namespace Database\Seeders;

use App\Models\Seller;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'iskander',
        //     'email' => 'iskanderboss1999@gmail.com',
        //     'password' => Hash::make('admin@gmail.com'),
        // ]);


        Seller::factory()->create([
            // 'name' => 'iskander',
            // 'email' => 'seller@gmail.com',
            // 'password' => Hash::make('seller@gmail.com'),
            'name' => 'iskander',
            'email' => 'iskanderboss1999@gmail.com',
            'password' => Hash::make('iskanderboss1999@gmail.com'),
        ]);

    }
}
