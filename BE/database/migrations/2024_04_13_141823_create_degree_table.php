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
        Schema::create('Degree', function (Blueprint $table) {
            $table->id();
            $table->Integer('id_customer');
            $table->string('degree_image')->nullable();
            $table->enum('status', ['Processed', 'Cancel', 'Waiting'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Degree');
    }
};
