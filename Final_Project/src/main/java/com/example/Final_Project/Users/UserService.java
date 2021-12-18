package com.example.Final_Project.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Final_Project.Role.*;
import java.util.*;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;




    @Autowired
    public UserService(UserRepository userRepository, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUser_name(username);
        if(user  == null){
            throw new UsernameNotFoundException("User not found in the database");
        }


        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUser_name(), user.getPassword(), authorities);
    }



    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String id){
        int user_id = Integer.valueOf(id);
        return userRepository.findById(user_id).orElse(null);
    }

    public User addUser(User user){


        Role role = roleRepo.findById(Long.valueOf(2)).orElse(null);
        user.getRoles().add(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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


