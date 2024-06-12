<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class evaluate extends Model
{
    use HasFactory;

    protected $table='evaluate';
    public $timestamps = true;
    protected $fillable = [
        'id',
        'id_customer',
        'id_coach',
        'rating',
        'comment',
        
    ];
}
