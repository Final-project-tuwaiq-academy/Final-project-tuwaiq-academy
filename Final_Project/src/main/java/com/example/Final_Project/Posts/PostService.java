package com.example.Final_Project.Posts;

import com.example.Final_Project.Comments.CommentRepository;
import com.example.Final_Project.Favorite.FavoriteRepository;
import com.example.Final_Project.Notifications.NotificationsRepository;
import com.example.Final_Project.Post_Price.Post_Price;
import com.example.Final_Project.Post_Price.Post_PriceRepository;
import com.example.Final_Project.Post_Price.Post_PriceService;
import com.example.Final_Project.Users.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final Post_PriceService post_PriceService;

    private final CommentRepository commentRepository;
    private final FavoriteRepository favoriteRepository;
    private final NotificationsRepository notificationsRepository;
    private final Post_PriceRepository post_PriceRepository;


    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, Post_PriceService post_priceService, CommentRepository commentRepository, FavoriteRepository favoriteRepository, NotificationsRepository notificationsRepository, Post_PriceRepository post_priceRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.post_PriceService = post_priceService;
        this.commentRepository = commentRepository;
        this.favoriteRepository = favoriteRepository;
        this.notificationsRepository = notificationsRepository;
        this.post_PriceRepository = post_priceRepository;
    }

    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post getPost(String id){
        int post_id = Integer.valueOf(id);
        return postRepository.findById(post_id).orElse(null);
    }

    public ResponseEntity<String> addPost(Post post, int user_id) {

        if (post.getTitle().equals("") || post.getTitle() == null){
            return ResponseEntity.ok().body("Post title is empty or incorrect");}

        if (post.getCity().equals("") || post.getCity() == null){
            return ResponseEntity.ok().body("Please select a city");}

        if (post.getPost_type().equals("") || post.getPost_type() == null){
            return ResponseEntity.ok().body("Please select a type");}

        if (post.getContent().equals("") || post.getContent() == null){
            return ResponseEntity.ok().body("Please enter a description");}

        if (post.getImages().equals("") || post.getImages() == null){
            return ResponseEntity.ok().body("Please enter a image");}

        User user = userRepository.findById(user_id).orElse(null);
        post.setUser(user);
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd-HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        post.setDate(date.format(now.plusDays(1)));


        Post_Price postPrice = new Post_Price();
        postPrice.setPost(post);
        postPrice.setUser(user);
        postPrice.setPrice(post.getPrice());
        post.setState("Open");
        postRepository.save(post);
        post_PriceService.addPost_Price(postPrice, post.getPost_id(), user.getUser_id());
    return ResponseEntity.ok().body("ok");}


    public void deletePost(String id){
        int post_id = Integer.valueOf(id);
        commentRepository.deleteAllByPost_id(post_id);
        favoriteRepository.deleteAllByPost_id(post_id);
        notificationsRepository.deleteAllByPost_id(post_id);
        post_PriceRepository.deleteAllByPost_id(post_id);
        postRepository.deleteById(post_id);
    }

    public void updatePost(String id, Post data){
        int post_id = Integer.valueOf(id);
        Post post = postRepository.findById(post_id).orElse(null);

        if (post != null){
            post.setTitle(data.getTitle());
            post.setContent(data.getContent());
            post.setCity(data.getCity());
            post.setPost_type(data.getPost_type());
            post.setImages(data.getImages());
            post.setState(data.getState());
            postRepository.save(post);
            }
        }


    }


