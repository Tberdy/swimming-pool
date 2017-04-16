<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function get(Request $request) {
        $user = App\User::find($request->id);
        return response()->success(compact('user'));
    }

    public function getList() {
        $users = App\User::get();
        return response()->success(compact('users'));
    }

    public function update(Request $request) {
        $this->validate($request, [
            'firstname'  => 'required|min:3',
            'name'       => 'required|min:3',
            'password'   => 'required|min:8',
            'gender'     => 'required',
            'birthdate'  => 'required'
        ]);
        
        $user = App\User::find($request->id);
        
        $user->firstname = trim($request->firstname);
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->gender = intval($request->gender);
        $user->birthdate = date( "Y-m-d", strtotime($request->birthdate));
        
        $user->save();
    }

    public function delete(Request $request) {
        App\User::destroy($request->id);
    }
}
