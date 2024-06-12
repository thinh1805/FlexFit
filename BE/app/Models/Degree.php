<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    use HasFactory;
    protected $table='degree';
    public $timestamps = true;
    protected $fillable = [
        'id_customer',
        'degree_image',
        'status',
        
    ];
}
