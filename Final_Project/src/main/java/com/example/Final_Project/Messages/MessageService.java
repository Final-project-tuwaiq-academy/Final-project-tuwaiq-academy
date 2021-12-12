package com.example.Final_Project.Messages;

import com.example.Final_Project.Users.User;
import com.example.Final_Project.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;



    @Autowired
    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getMessages(){
        return messageRepository.findAll();
    }

    public Message getMessage(String id){
        int message_id = Integer.valueOf(id);
        return messageRepository.findById(message_id).orElse(null);
    }

    public Message addMessage(Message message, int sender_id, int receiver_id){
        User sender = userRepository.findById(sender_id).orElse(null);
        User receiver = userRepository.findById(receiver_id).orElse(null);

        message.setSender(sender);
        message.setReceiver(receiver);

        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        message.setDate(date.format(now));

        return messageRepository.save(message);
    }

    public void deleteMessage(String id){
        int message_id = Integer.valueOf(id);
        messageRepository.deleteById(message_id);

    }

    }


