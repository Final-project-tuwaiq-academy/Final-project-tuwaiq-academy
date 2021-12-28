package com.example.Final_Project.Role;

import com.example.Final_Project.Users.User;
import com.example.Final_Project.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepo roleRepo;
    private final UserRepository userRepository;

    @Autowired
    public RoleService(RoleRepo roleRepo, UserRepository userRepository) {
        this.roleRepo = roleRepo;
        this.userRepository = userRepository;
    }

    public Role saveRole(Role role, User user){
        role.setId(Long.valueOf(2));
        role.setName("USER");
        role.setUser(user);
        return roleRepo.save(role);
    }
}
