package com.example.Final_Project.Post_Price;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Users.User;

import javax.persistence.*;


@Entity
@Table(name = "post_price")
public class Post_Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Post_Price_id;

    @OneToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "post_id",unique = true)
    private Post post_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "user_id")
    private User user_id;

    private int price;

    public Post_Price() {
    }

    public Post_Price(int post_Price_id, Post post_id, User user_id, int price) {
        Post_Price_id = post_Price_id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.price = price;
    }

    public int getPost_Price() {
        return Post_Price_id;
    }

    public void setPost_Price(int Post_Price_id) {
        Post_Price_id = Post_Price_id;
    }

    public Post getPost() {
        return post_id;
    }

    public void setPost(Post post_id) {
        this.post_id = post_id;
    }

    public User getUser() {
        return user_id;
    }

    public void setUser(User user_id) {
        this.user_id = user_id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}