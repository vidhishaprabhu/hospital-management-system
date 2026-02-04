<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $table='patients';

    protected $fillable=[
        'name',
        'date_of_birth',
        'gender',
        'address',
        'phone_number',
        'admission_date',
        'discharge_date'
    ];
}
