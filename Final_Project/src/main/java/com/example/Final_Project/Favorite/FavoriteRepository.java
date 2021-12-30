package com.example.Final_Project.Favorite;

import com.example.Final_Project.Comments.Comment;
import com.example.Final_Project.Posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    @Query("select u from Favorite u where u.user_id.user_id = :#{#id}")
    List<Favorite> findAllByUser_id(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("delete from Favorite l where l.post_id.post_id =:#{#post_id}")
    void deleteAllByPost_id(@Param("post_id") int post_id);
}