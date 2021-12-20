package com.example.Final_Project.Posts;

import com.example.Final_Project.Comments.CommentRepository;
import com.example.Final_Project.Favorite.FavoriteRepository;
import com.example.Final_Project.Notifications.NotificationsRepository;
import com.example.Final_Project.Post_Price.Post_Price;
import com.example.Final_Project.Post_Price.Post_PriceRepository;
import com.example.Final_Project.Post_Price.Post_PriceService;
import com.example.Final_Project.Users.*;
import org.springframework.beans.factory.annotation.Autowired;
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
        post_PriceRepository = post_priceRepository;
    }

    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post getPost(String id){
        int post_id = Integer.valueOf(id);
        return postRepository.findById(post_id).orElse(null);
    }

    public void addPost(Post post, int user_id) {
        User user = userRepository.findById(user_id).orElse(null);


        post.setUser(user);

        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        post.setDate(date.format(now));

        Post_Price postPrice = new Post_Price();
        postPrice.setPost(post);
        postPrice.setUser(user);
        postPrice.setPrice(post.getPrice());
        postRepository.save(post);
        post_PriceService.addPost_Price(postPrice, post.getPost_id(), user.getUser_id());
    }




    public void deletePost(String id){
        int post_id = Integer.valueOf(id);

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
            postRepository.save(post);
            }
        }


    }


