package com.example.Final_Project.Post_Price;

import com.example.Final_Project.Posts.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path= "post_price")
@CrossOrigin("*")
public class Post_PriceController {

    private final Post_PriceService post_PriceService;


    @Autowired
    public Post_PriceController(Post_PriceService post_PriceService) {
        this.post_PriceService = post_PriceService;
    }



    @GetMapping
    public List<Post_Price> getPost_Prices(@RequestParam(required = false) String filter){
        return post_PriceService.getPost_Prices();
    }

    @GetMapping("/{id}")
    public Post_Price getPost_Price(@PathVariable String id){
        return post_PriceService.getPost_Price(id);
    }

    @PostMapping
    public void addPost_Price(@RequestBody Form form){

        post_PriceService.addPost_Price(form.getPost_price(), form.getPost_id(), form.getUser_id());
    }

    @DeleteMapping("/{id}")
    public void delPost_Price(@PathVariable String id){
        post_PriceService.deletePost_Price(id);
    }


    @PutMapping("/{id}")
    public void updatePost_Price(@PathVariable String id, @RequestBody Post_Price data){
        post_PriceService.updatePost_Price(id, data);
    }


}

class Form{
    private Post_Price post_price;
    private int user_id;
    private int post_id;


    public Post_Price getPost_price() {
        return post_price;
    }

    public int getUser_id() {
        return user_id;
    }

    public int getPost_id() {
        return post_id;
    }
}
