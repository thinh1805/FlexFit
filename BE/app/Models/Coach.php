<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;
    protected $table='coach';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'name',
        'DOB',
        'phone',
        'sex',
        'image',
        'id_payment',
        'degree',
        'role_id',
        'id_schedule',
        'id_course',
        'id_history',
        'address'
    ];
}
