package com.example.Final_Project.Messages;

import com.example.Final_Project.Users.User;

import javax.persistence.*;


@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int message_id;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "sender_id")
    private User sender_id;


    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "receiver_id")
    private User receiver_id;

    private String date;
    private int message_number;
    private String seen;
    private String content;

    public Message() {
    }


    public Message(int message_id, User sender_id, User receiver_id, String date, int message_number, String seen, String content) {
        this.message_id = message_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.date = date;
        this.message_number = message_number;
        this.seen = seen;
        this.content = content;
    }

    public int getMessage_id() {
        return message_id;
    }

    public void setMessage_id(int message_id) {
        this.message_id = message_id;
    }

    public User getSender() {
        return sender_id;
    }

    public void setSender(User sender_id) {
        this.sender_id = sender_id;
    }

    public User getReceiver() {
        return receiver_id;
    }

    public void setReceiver(User receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getMessage_number() {
        return message_number;
    }

    public void setMessage_number(int message_number) {
        this.message_number = message_number;
    }

    public String getSeen() {
        return seen;
    }

    public void setSeen(String seen) {
        this.seen = seen;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}


