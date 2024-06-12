<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class intermediate extends Model
{
    use HasFactory;
    protected $table= 'intermediate';
    protected $fillable = [
        'id',
        'id_coach',
        'id_user',
        'accept',
        'id_payment',
    ];
}
