<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    protected $table = 'reactions';
    
    public $timestamps = true;
    
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    public function content() {
        return $this->belongsTo('App\Content');
    }
}
