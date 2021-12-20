package com.example.Final_Project.Notifications;

import com.example.Final_Project.Comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Integer> {
    @Query("delete  from Notifications u where u.post_id.post_id = :#{#id}")
    List<Notifications> deleteAllByPost_id(@Param("id") int id);
}