package com.example.Final_Project.Notifications;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Users.User;

import javax.persistence.*;


@Entity
@Table(name = "notifications")
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notification_id;
    private String title;
    private String date;
    private String been_seen;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "user_id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "post_id")
    private Post post_id;

    public Notifications() {
    }

    public Notifications(int notification_id, String title, String date, String been_seen, User user_id, Post post_id) {
        this.notification_id = notification_id;
        this.title = title;
        this.date = date;
        this.been_seen = been_seen;
        this.user_id = user_id;
        this.post_id = post_id;
    }

    public int getNotification_id() {
        return notification_id;
    }

    public void setNotification_id(int notification_id) {
        this.notification_id = notification_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBeen_seen() {
        return been_seen;
    }

    public void setBeen_seen(String been_seen) {
        this.been_seen = been_seen;
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
