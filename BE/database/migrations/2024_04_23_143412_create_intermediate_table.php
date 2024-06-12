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
        Schema::create('intermediate', function (Blueprint $table) {
            $table->id();
            $table->integer('id_coach');
            $table->integer('id_user');
            $table->unsignedTinyInteger('Accept')->default(0)->comment('0: False, 1: True');
            $table->unsignedTinyInteger('id_payment')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_intermediate');
    }
};
