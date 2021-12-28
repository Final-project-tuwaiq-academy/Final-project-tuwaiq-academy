package com.example.Final_Project.Role;

import com.example.Final_Project.Comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    @Query("select u from Role u where u.user.user_id = :#{#id}")
    Role findByUser_User_id(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("delete from Role l where l.user.user_id =:#{#id}")
    void deleteByUser(@Param("id") int id);
}
