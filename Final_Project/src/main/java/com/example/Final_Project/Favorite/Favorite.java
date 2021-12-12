package com.example.Final_Project.Favorite;

import com.example.Final_Project.Post_Price.Post_Price;
import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Users.User;

import javax.persistence.*;


@Entity
@Table(name = "favorite")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favorite_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "user_id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "post_id")
    private Post post_id;

    public Favorite() {
    }

    public Favorite(int favorite_id, User user_id, Post post_id) {
        this.favorite_id = favorite_id;
        this.user_id = user_id;
        this.post_id = post_id;
    }

    public int getFavorite_id() {
        return favorite_id;
    }

    public void setFavorite_id(int favorite_id) {
        this.favorite_id = favorite_id;
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
}



