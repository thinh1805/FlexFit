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
        Schema::create('history', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->string('sex');
            $table->integer('age');
            $table->float('weight');
            $table->float('height');
            $table->float('neck');
            $table->float('chest');
            $table->float('abdomen');
            $table->float('hip');
            $table->float('thigh');
            $table->float('knee');
            $table->float('ankle');
            $table->float('biceps');
            $table->float('forearm');
            $table->float('wrist');
            $table->float('bodyfat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history');
    }
};
