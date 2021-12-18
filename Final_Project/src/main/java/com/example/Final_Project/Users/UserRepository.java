package com.example.Final_Project.Users;

import com.example.Final_Project.Comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u where u.user_name = :#{#userName}")
    User findByUser_name(@Param("userName") String userName);
}