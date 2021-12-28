package com.example.Final_Project.Users;

import com.example.Final_Project.Comments.Comment;
import com.example.Final_Project.Role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u where u.user_name = :#{#userName}")
    User findByUser_name(@Param("userName") String userName);

    @Query("select u from User u where u.email = :#{#Email}")
    User findByEmail(@Param("Email") String Email);


}