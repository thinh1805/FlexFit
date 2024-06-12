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
        Schema::create('Exercises', function (Blueprint $table) {
            $table->id();
            $table->String('name');
            $table->String('set');
            $table->String('rep');
            $table->String('time_minutes');
            $table->String('calo_kcal');
            $table->String('url');
            $table->Integer('id_type_ex');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Exercises');
    }
};
