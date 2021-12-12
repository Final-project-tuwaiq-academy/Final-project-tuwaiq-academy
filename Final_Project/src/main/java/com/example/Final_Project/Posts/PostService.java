package com.example.Final_Project.Posts;

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


    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post getPost(String id){
        int post_id = Integer.valueOf(id);
        return postRepository.findById(post_id).orElse(null);
    }

    public Post addPost(Post post, int user_id){
        User user = userRepository.findById(user_id).orElse(null);

        post.setUser(user);

        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        post.setDate(date.format(now));

        return postRepository.save(post);
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


