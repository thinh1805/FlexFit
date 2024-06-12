<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type_Ex extends Model
{
    use HasFactory;
    protected $table='type_ex';
    public $timestamps = true;
    protected $fillable = [
        'name'
    ];
}
