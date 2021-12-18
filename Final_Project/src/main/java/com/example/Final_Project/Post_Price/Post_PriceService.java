package com.example.Final_Project.Post_Price;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Posts.PostRepository;
import com.example.Final_Project.Users.UserRepository;
import com.example.Final_Project.Users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class Post_PriceService {

    private final Post_PriceRepository post_PriceRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    @Autowired
    public Post_PriceService(Post_PriceRepository post_PriceRepository, PostRepository postRepository, UserRepository userRepository) {
        this.post_PriceRepository = post_PriceRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post_Price> getPost_Prices(){
        return post_PriceRepository.findAll();
    }

    public Post_Price getPost_Price(String id){
        int post_Price_id = Integer.valueOf(id);
        return post_PriceRepository.findByPost_id(post_Price_id);
    }

    public Post_Price addPost_Price(Post_Price post_Price, int post_id, int user_id){
        User user = userRepository.findById(user_id).orElse(null);
        Post post = postRepository.findById(post_id).orElse(null);

        post_Price.setUser(user);
        post_Price.setPost(post);

        return post_PriceRepository.save(post_Price);
    }

    public void deletePost_Price(String id){
        int post_Price_id = Integer.valueOf(id);
        post_PriceRepository.deleteById(post_Price_id);

    }

    public void updatePost_Price(String id, Post_Price data){
        int post_price_id = Integer.valueOf(id);
        Post_Price post_Price = post_PriceRepository.findById(post_price_id).orElse(null);
        User user = userRepository.findById(data.getUser().getUser_id()).orElse(null);

        if (post_Price != null){
            post_Price.setUser(user);
            post_Price.setPrice(data.getPrice());
            post_PriceRepository.save(post_Price);
        }
    }
}


