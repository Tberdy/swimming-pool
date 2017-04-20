<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User as User;
use App\Content as Content;
use App\Reaction as Reaction;

class ContentController extends Controller {

    public function get(Request $request) {
        $content = Content::find($request->content_id);
        return response()->success(compact('content'));
    }

    public function listAll(Request $request) {
        $user = User::find($request->user_id);
        $contents = $user->contents()->get();
        return response()->success(compact('contents'));
    }
    
    public function listFriendsAll(Request $request) {
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
        
        $contents = array();
        foreach ($friends as $friend) {
            $content = $friend->contents()->get();
            foreach ($content as $value) {
                $value->reactions = array(
                    'like' => $value->reactions()->where('type', '=', 'like')->count(),
                    'love' => $value->reactions()->where('type', '=', 'love')->count(),
                    'dislike' => $value->reactions()->where('type', '=', 'dislike')->count(),
                    'happy' => $value->reactions()->where('type', '=', 'happy')->count(),
                    'neutral' => $value->reactions()->where('type', '=', 'neutral')->count(),
                    'fire' => $value->reactions()->where('type', '=', 'fire')->count()
                );
                $value->user = $friend;
                $contents[] = $value;
            }
        }

        return response()->success(compact('contents'));
    }

    public function listPosts(Request $request) {
        $user = User::find($request->user_id);
        $posts = $user->contents()->where('type', 'post')->get();
        return response()->success(compact('posts'));
    }

    public function listEvents(Request $request) {
        $user = User::find($request->user_id);
        $events = $user->contents()->where('type', 'event')->get();
        return response()->success(compact('events'));
    }

    public function listPictures(Request $request) {
        $user = User::find($request->user_id);
        $pictures = $user->contents()->where('type', 'picture')->get();
        return response()->success(compact('pictures'));
    }

    public function addPost(Request $request) {        
        $content = new Content;
        $content->user_id = $request->id;
        $content->type = 'post';
        $content->text = trim($request->text);
        $content->save();
        return response()->success(array());
    }

    public function addEvent(Request $request) {
        $content = new Content;
        $content->user_id = $request->id;
        $content->type = 'event';
        $content->text = trim($request->text);
        $content->date = date( "Y-m-d H:i:s", strtotime($request->date));
        $content->save();
        return response()->success(array());
    }

    public function addFile(Request $request) {
        $id = $request->id;
        
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $originalFilename = $file->getClientOriginalName();
        $filename = uniqid($id . '-') . '.' . $extension;
        $path = 'storage' . DIRECTORY_SEPARATOR . $id;
        $file->move($path, $filename);   
        
        $content = new Content;
        $content->user_id = $id;
        $content->type = 'file';
        $content->text = $originalFilename;
        $content->file = $path . DIRECTORY_SEPARATOR . $filename;
        $content->save();
        return response()->success(array());
    }

    public function delete(Request $request) {
        Content::find($request->content_id)->delete();
        return response()->success(array());
    }
}
