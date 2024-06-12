<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->integer('id_owner');
            $table->string('name');
            $table->unsignedTinyInteger('id_user')->comment('0: Admin, 1: Customer, 2: Coach')->nullable();
            $table->date('date');
            // $table->time('time_start');
            // $table->time('time_end');
            $table->longText('describe')->nullable();
            $table->enum('status', ['Processed', 'Cancel', 'Waiting'])->nullable();
            $table->integer('id_meals')->nullable();
            $table->integer('id_exercises')->nullable();
            $table->string('weight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
};
