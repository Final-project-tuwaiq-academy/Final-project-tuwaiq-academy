package com.example.Final_Project.Role;

import com.example.Final_Project.Users.User;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    public Role() {
    }

    public Role(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


