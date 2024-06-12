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
        Schema::create('Coach', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->unsignedTinyInteger('role_id')->default(2)->comment('0: Admin, 1: Customer, 2: Coach');
            $table->string('name')->nullable();
            $table->date('DOB')->nullable();
            $table->string('phone')->nullable();
            $table->enum('sex', ['Male', 'Female', 'Pending'])->nullable();
            $table->string('image')->nullable();
            $table->integer('id_payment')->nullable();
            $table->string('degree')->nullable();
            $table->string('address')->nullable();
            $table->integer('id_schedule')->nullable();
            $table->integer('id_course')->nullable();
            $table->integer('id_history')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Coach');
    }
};
