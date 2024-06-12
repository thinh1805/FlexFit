<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table='customer';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'role_id',
        'email',
        'password',
        'name',
        'DOB',
        'phone',
        'sex',
        'image',
        'address'
    ];
}
