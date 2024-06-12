<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class history extends Model
{
    use HasFactory;
    protected $table= 'history';
    protected $fillable = [
        'id_user',
        'sex',
        'age',
        'weight',
        'height',
        'neck',
        'chest',
        'abdomen',
        'hip',
        'thigh',
        'knee',
        'ankle',
        'biceps',
        'forearm',
        'wrist',
        'bodyfat'
    ];
}
