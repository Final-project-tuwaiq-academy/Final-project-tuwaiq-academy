package com.example.Final_Project.Comments;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Users.User;

import javax.persistence.*;


@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int comment_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "user_id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "post_id")
    private Post post_id;

    private String content;
    private String date;

    public Comment() {
    }

    public Comment(int comment_id, User user_id, Post post_id, String content, String date) {
        this.comment_id = comment_id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.content = content;
        this.date = date;
    }

    public int getComment_id() {
        return comment_id;
    }

    public void setComment_id(int comment_id) {
        this.comment_id = comment_id;
    }

    public User getUser() {
        return user_id;
    }

    public void setUser(User user_id) {
        this.user_id = user_id;
    }

    public Post getPost() {
        return post_id;
    }

    public void setPost(Post post_id) {
        this.post_id = post_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}


