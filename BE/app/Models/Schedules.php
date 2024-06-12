<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    protected $fillable = [
        'id_owner',
        'name',
        'id_user',
        'date',
        // 'time_start',
        // 'time_end',
        'describe',
        'id_meals',
        'id_exercises',
        'weight',
    ];
}
