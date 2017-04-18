<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';
    
    public $timestamps = true;
    
    public function user() {
        $this->belongsTo('App\User');
    }
    
    public function comments() {
        $this->hasMany('App\Comment');
    }
}
