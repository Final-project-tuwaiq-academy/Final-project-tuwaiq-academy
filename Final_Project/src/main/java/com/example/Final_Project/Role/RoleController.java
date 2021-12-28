package com.example.Final_Project.Role;

import com.example.Final_Project.Users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "roles")
@CrossOrigin("*")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public Role saveRole(@RequestBody Form form){
        Role userRole = new Role();
        return roleService.saveRole(userRole, form.getUser_id());
    }
}
class Form {
    private Role role;
    private User user_id;

    public Role getRole() {
        return role;
    }

    public User getUser_id() {
        return user_id;
    }
}