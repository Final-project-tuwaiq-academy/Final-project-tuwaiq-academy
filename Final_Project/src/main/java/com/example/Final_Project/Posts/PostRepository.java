package com.example.Final_Project.Posts;

import com.example.Final_Project.Comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("select u from Post u where u.user_id.user_id = :#{#id}")
    List<Post> findAllByUser_id(@Param("id") int id);
}