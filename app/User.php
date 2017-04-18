<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'name', 'email', 'password', 'gender', 'birthdate'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
    * Get the identifier that will be stored in the subject claim of the JWT
    *
    * @return mixed
    */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

   /**
    * Return a key value array, containing any custom claims to be added to the JWT
    *
    * @return array
    */
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    /**
    * Return a key value array, containing any friends I added
    *
    * @return array
    */
    public function friendsIAdded() {
        return $this->belongsToMany('App\User', 'friendship', 'id_from', 'id_to');
    }
    
    /**
    * Return a key value array, containing any user who add me as friends
    *
    * @return array
    */
    public function friendsWhoAddMe() {
        return $this->belongsToMany('App\User', 'friendship', 'id_to', 'id_from');
    }
    
    /**
    * Return a key value array, containing any contents owned by user
    *
    * @return array
    */
    public function contents() {
        return $this->hasMany('App\Content');
    }
    
    /**
    * Return a key value array, containing any comments owned by user
    *
    * @return array
    */
    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
