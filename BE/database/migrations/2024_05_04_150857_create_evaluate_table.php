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
        Schema::create('evaluate', function (Blueprint $table) {
            $table->id();
            $table->integer('id_customer');
            $table->integer('id_coach');
            $table->decimal('rating', 3, 2)->nullable();
            $table->text('comment')->nullable();    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluate');
    }
};
