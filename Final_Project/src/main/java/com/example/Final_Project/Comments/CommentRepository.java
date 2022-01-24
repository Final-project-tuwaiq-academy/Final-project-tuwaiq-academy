package com.example.Final_Project.Comments;

import com.example.Final_Project.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select u from Comment u where u.post_id.post_id = :#{#id}")
    List<Comment> findAllByCAndComment_id(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("delete from Comment l where l.post_id.post_id =:#{#post_id}")
    void deleteAllByPost_id(@Param("post_id") int post_id);


}