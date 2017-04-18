<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User as User;

class UserController extends Controller {

    public function get(Request $request) {
        $user = User::find($request->user_id);
        return response()->success(compact('user'));
    }

    public function getList() {
        $users = User::get();
        return response()->success(compact('users'));
    }

    public function update(Request $request) {
        $this->validate($request, [
            'firstname' => 'required|min:3',
            'name' => 'required|min:3',
            'password' => 'required|min:8',
            'gender' => 'required',
            'birthdate' => 'required'
        ]);

        $user = User::find($request->id);

        $user->firstname = trim($request->firstname);
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->gender = intval($request->gender);
        $user->birthdate = date("Y-m-d", strtotime($request->birthdate));

        $user->save();

        return response()->success(array());
    }

    public function delete(Request $request) {
        User::destroy($request->id);

        return response()->success(array());
    }

    public function listFriends(Request $request) {
        $user = User::find($request->id);
        $friends = array();
        $friendsIAdded = $user->friendsIAdded()->get();
        $friendsWhoAddMe = $user->friendsWhoAddMe()->get();
        
        foreach ($friendsIAdded as $fr1) {
            foreach ($friendsWhoAddMe as $fr2) {
                if ($fr1->id == $fr2->id) {
                    $friends[] = $fr1;
                    break;
                }
            }
        }
        
        return response()->success(compact('friends'));
    }
    
    public function listRequests(Request $request) {
        $user = User::find($request->id);
        $fRequests = $user->friendsIAdded()->get();
        $friendsWhoAddMe = $user->friendsWhoAddMe()->get();
        
        foreach ($fRequests as $key => $fr1) {
            foreach ($friendsWhoAddMe as $fr2) {
                if ($fr1->id == $fr2->id) {
                    unset($fRequests[$key]);
                    break;
                }
            }
        }
        
        return response()->success(compact('fRequests'));
    }
    
    public function listInvitations(Request $request) {
        $user = User::find($request->id);
        $friendsIAdded = $user->friendsIAdded()->get();
        $fInvitations = $user->friendsWhoAddMe()->get();
        
        foreach ($fInvitations as $key => $fr1) {
            foreach ($friendsIAdded as $fr2) {
                if ($fr1->id == $fr2->id) {
                    unset($fInvitations[$key]);
                    break;
                }
            }
        }
        
        return response()->success(compact('fInvitations'));
    }

    public function addFriend(Request $request) {
        $user = User::find($request->id);
        $user->friendsIAdded()->attach($request->friend_id);
        return response()->success(array());
    }

    public function confirmFriend(Request $request) {
        $user = User::find($request->id);
        $user->friendsWhoAddMe()->attach($request->friend_id);
        return response()->success(array());
    }

    public function deleteFriend(Request $request) {
        $user = User::find($request->id);
        $user->friendsIAdded()->detach($request->friend_id);
        return response()->success(array());
    }

}
