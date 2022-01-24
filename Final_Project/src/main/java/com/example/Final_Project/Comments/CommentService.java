package com.example.Final_Project.Comments;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Posts.PostRepository;
import com.example.Final_Project.Users.User;
import com.example.Final_Project.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Comment> getComments(){
        return commentRepository.findAll();
    }

    public List<Comment>  getCommentsInPost(String id){

        return commentRepository.findAllByCAndComment_id(Integer.valueOf(id));
    }



    public Comment addComment(Comment comment, int post_id, int user_id){
        User user = userRepository.findById(user_id).orElse(null);
        Post post = postRepository.findById(post_id).orElse(null);

        comment.setPost(post);
        comment.setUser(user);

        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        comment.setDate(date.format(now));
        return commentRepository.save(comment);
    }

    public void deleteComment(String id){
        int comment_id = Integer.valueOf(id);
        commentRepository.deleteById(comment_id);

    }

    public void updateComment(String id, Comment data){
        int comment_id = Integer.valueOf(id);
        Comment comment = commentRepository.findById(comment_id).orElse(null);

        if (comment != null){
            comment.setContent(data.getContent());
            comment.setDate(data.getDate());
            commentRepository.save(comment);
            }
        }


    }


