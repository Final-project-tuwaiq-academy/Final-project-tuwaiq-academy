package com.example.Final_Project.User;

import com.example.Final_Project.Users.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepoTest {

    private final UserRepository userRepo;

    @Autowired
    public UserRepoTest(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    @Test
    void itShouldFindUser() {
        User user = new User();
        user.setUser_id(1);
        user.setUser_name("Tameem");
        User savedUser = userRepo.save(user);

        User result = userRepo.findById(savedUser.getUser_id()).orElse(null);

        assertNotNull(result);
    }

    @Test
    void itShouldSaveUser() {

        User user = new User();

        user.setUser_id(2);
        User result = userRepo.save(user);


        assertTrue(String.valueOf(result.getUser_id()) != null);
    }

    @Test
    void itShouldFindUserByEmail() {
        String email = "a@a.com";
        User user = new User();
        userRepo.save(user);

        User result = userRepo.findByEmail(email);

        assertEquals(email, result.getEmail());
        assertNotEquals("b@b.com", result.getEmail());

    }
}