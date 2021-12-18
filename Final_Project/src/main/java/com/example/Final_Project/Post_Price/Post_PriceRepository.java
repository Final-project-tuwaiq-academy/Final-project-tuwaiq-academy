package com.example.Final_Project.Post_Price;

import com.example.Final_Project.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface Post_PriceRepository extends JpaRepository<Post_Price, Integer> {
    @Query("select u from Post_Price u where u.post_id.post_id = :#{#postId}")
    Post_Price findByPost_id(@Param("postId") Integer postId);
}