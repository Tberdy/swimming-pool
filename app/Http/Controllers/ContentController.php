<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User as User;
use App\Content as Content;

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
        $content->text = trim($request->data->text);
        $content->save();
        return response()->success(array());
    }

    public function addEvent(Request $request) {
        $content = new Content;
        $content->user_id = $request->id;
        $content->type = 'event';
        $content->text = trim($request->data->text);
        $content->date = date( "Y-m-d H:i:s", strtotime($request->data->date));
        $content->save();
        return response()->success(array());
    }

    public function addFile(Request $request) {
        $content = new Content;
        $content->user_id = $request->id;
        $content->type = 'file';
        $content->text = trim($request->data->text);
        $content->file = '';
        $content->save();
        return response()->success(array());
    }

    public function delete(Request $request) {
        Content::find($request->content_id)->delete();
        return response()->success(array());
    }
}
