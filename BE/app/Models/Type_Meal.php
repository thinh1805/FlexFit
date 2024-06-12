<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type_Meal extends Model
{
    use HasFactory;
    protected $table='type_meal';
    public $timestamps = true;
    protected $fillable = [
        'nameType'
    ];
}
