package com.example.Final_Project.Comments;

import com.example.Final_Project.Favorite.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path= "comments")
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;


    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }



    @GetMapping
    public List<Comment> getComments(@RequestParam(required = false) String filter){
        return commentService.getComments();
    }

    @GetMapping("/{id}")
    public List<Comment> getComment(@PathVariable String id){

        return commentService.getCommentsInPost(id);
    }

    @PostMapping
    public void addComment(@RequestBody Form form){

        commentService.addComment(form.getComment(), form.getPost_id(), form.getUser_id());
    }

    @DeleteMapping("/{id}")
    public void delComment(@PathVariable String id){
        commentService.deleteComment(id);
    }


    @PutMapping("/{id}")
    public void updateComment(@PathVariable String id, @RequestBody Comment data){
        commentService.updateComment(id, data);
    }

}
class Form{
    private Comment comment;
    private int user_id;
    private int post_id;


    public Comment getComment() {
        return comment;
    }

    public int getUser_id() {
        return user_id;
    }

    public int getPost_id() {
        return post_id;
    }
}
