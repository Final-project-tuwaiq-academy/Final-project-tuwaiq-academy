package com.example.Final_Project.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class UserService {

    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String id){
        int user_id = Integer.valueOf(id);
        return userRepository.findById(user_id).orElse(null);
    }

    public User addUser(User user){

        return userRepository.save(user);
    }

    public void deleteUser(String id){
        int user_id = Integer.valueOf(id);
        userRepository.deleteById(user_id);

    }

    public void updateUser(String id, User data){
        int user_id = Integer.valueOf(id);
        User user = userRepository.findById(user_id).orElse(null);

        if (user != null){
            user.setUser_name(data.getUser_name());
            user.setBalance(data.getBalance());
            user.setEmail(data.getEmail());
            user.setPhone(data.getPhone());
            user.setPassword(data.getPassword());
            userRepository.save(user);
            }
        }


    }


