<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Admin', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->unsignedTinyInteger('role_id')->default(0)->comment('0: Admin, 1: Customer, 2: Coach');
            $table->integer('id_payment')->nullable();
            $table->integer('id_meals')->nullable();
            $table->integer('id_exercises')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Admin');
    }
};
