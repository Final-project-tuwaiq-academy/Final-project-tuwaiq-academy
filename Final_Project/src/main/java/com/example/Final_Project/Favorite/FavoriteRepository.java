package com.example.Final_Project.Favorite;

import com.example.Final_Project.Comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    @Query("delete  from Favorite u where u.post_id.post_id= :#{#id}")
    List<Favorite> deleteAllByPost_id(@Param("id") int id);
}