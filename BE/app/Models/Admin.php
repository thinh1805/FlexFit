<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $table='admin';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'id_payment',
        'id_meals',
        'id_exercises',
        'role_id',
        
    ];
}
