package com.example.Final_Project.Notifications;

import com.example.Final_Project.Post_Price.Post_Price;
import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Users.User;
import com.example.Final_Project.Users.UserRepository;
import com.example.Final_Project.Posts.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class NotificationsService {

    private final NotificationsRepository notificationsRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;



    @Autowired
    public NotificationsService(NotificationsRepository notificationsRepository, UserRepository userRepository, PostRepository postRepository) {
        this.notificationsRepository = notificationsRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    public List<Notifications> getNotifications(){
        return notificationsRepository.findAll();
    }

    public Notifications getNotification(String id){
        int Notification_id = Integer.valueOf(id);
        return notificationsRepository.findById(Notification_id).orElse(null);
    }
    public Notifications getNotifications(String id){
        int notifications_id = Integer.valueOf(id);
        return notificationsRepository.findById(notifications_id).orElse(null);
    }

    public Notifications addNotifications(Notifications notifications, int post_id, int user_id){

        User user = userRepository.findById(user_id).orElse(null);
        Post post = postRepository.findById(post_id).orElse(null);

        notifications.setUser(user);
        notifications.setPost(post);

        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        notifications.setDate(date.format(now));

        return notificationsRepository.save(notifications);
    }

    public void deleteNotifications(String id){
        int notifications_id = Integer.valueOf(id);
        notificationsRepository.deleteById(notifications_id);

    }

    }


