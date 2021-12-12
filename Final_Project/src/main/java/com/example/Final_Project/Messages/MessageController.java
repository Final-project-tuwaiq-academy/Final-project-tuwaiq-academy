package com.example.Final_Project.Messages;

import com.example.Final_Project.Posts.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path= "messages")
@CrossOrigin("*")
public class MessageController {

    private final MessageService messageService;


    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }



    @GetMapping
    public List<Message> getMessages(@RequestParam(required = false) String filter){
        return messageService.getMessages();
    }

    @GetMapping("/{id}")
    public Message getMessage(@PathVariable String id){
        return messageService.getMessage(id);
    }

    @PostMapping
    public void addMessage(@RequestBody Form form){
        messageService.addMessage(form.getMessage(), form.getSender_id(), form.getReceiver_id());
    }

    @DeleteMapping("/{id}")
    public void delMessage(@PathVariable String id){
        messageService.deleteMessage(id);
    }

}

class Form{
    private Message message;
    private int sender_id;
    private int receiver_id;


    public Message getMessage() {
        return message;
    }

    public int getSender_id() {
        return sender_id;
    }

    public int getReceiver_id() {
        return receiver_id;
    }
}
