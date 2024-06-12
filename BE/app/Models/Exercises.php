<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercises extends Model
{
    use HasFactory;
    protected $table='exercises';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'set',
        'rep',
        'time_minutes',
        'calo_kcal',
        'id_type_ex',
        'url'
    ];
}
