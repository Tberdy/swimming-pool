<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Content as Content;
use App\Comment as Comment;

class CommentController extends Controller
{
    public function get(Request $request) {
        $comment = Comment::find($request->comment_id);
        return response()->success(compact('comment'));
    }
    
    public function listPerContent(Request $request) {
        $content = Content::find($request->content_id);
        $comment = $content->comments()->get();
        return response()->success(compact('comment'));
    }
    
    public function add(Request $request) {
        $comment = new Comment;
        $comment->user_id = $request->id;
        $comment->content_id = $request->content_id;
        $comment->text = $request->text;
        $comment->save();
        return response()->success(array());
    }
    
    public function delete(Request $request) {
        Comment::find($request->comment_id)->delete();
        return response()->success(array());
    }
}
