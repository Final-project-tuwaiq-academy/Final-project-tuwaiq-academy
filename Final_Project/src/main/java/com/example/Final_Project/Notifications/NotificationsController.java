package com.example.Final_Project.Notifications;

import com.example.Final_Project.Post_Price.Post_Price;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path= "notifications")
@CrossOrigin("*")
public class NotificationsController {

    private final NotificationsService notificationsService;


    @Autowired
    public NotificationsController(NotificationsService notificationsService) {
        this.notificationsService = notificationsService;
    }



    @GetMapping
    public List<Notifications> getNotifications(@RequestParam(required = false) String filter){
        return notificationsService.getNotifications();
    }

    @GetMapping("/{id}")
    public Notifications getNotification(@PathVariable String id){
        return notificationsService.getNotification(id);
    }

    @PostMapping
    public void addNotifications(@RequestBody Form form){
        notificationsService.addNotifications(form.getNotifications(), form.getPost_id(), form.getUser_id());
    }

    @DeleteMapping("/{id}")
    public void delNotifications(@PathVariable String id){
        notificationsService.deleteNotifications(id);
    }





}

class Form{
    private Notifications notifications;
    private int user_id;
    private int post_id;


    public Notifications getNotifications() {
        return notifications;
    }

    public int getUser_id() {
        return user_id;
    }

    public int getPost_id() {
        return post_id;
    }
}
