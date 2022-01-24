package com.example.Final_Project.Posts;

import com.example.Final_Project.Users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path= "posts")
@CrossOrigin("*")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }


    @GetMapping
    public List<Post> getPosts(@RequestParam(required = false) String filter){
        return postService.getPosts();
    }

    @PostMapping
    public ResponseEntity<String> addPost(@RequestBody Form form){

        return postService.addPost(form.getPost(), form.getUser_id());
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable String id){
        return postService.getPost(id);
    }

    @DeleteMapping("/{id}")
    public void delPost(@PathVariable String id){
        postService.deletePost(id);
    }


    @PutMapping("/{id}")
    public void updateUser(@PathVariable String id, @RequestBody Post data){
        postService.updatePost(id, data);
    }

}
class Form{
    private Post post;
    private int user_id;


    public Post getPost() {
        return post;
    }
    public int getUser_id() {
        return user_id;
    }


}
