package com.example.Final_Project.Favorite;

import com.example.Final_Project.Posts.Post;
import com.example.Final_Project.Posts.PostRepository;
import com.example.Final_Project.Users.User;
import com.example.Final_Project.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;


    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, PostRepository postRepository, UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Favorite> getFavorites(){
        return favoriteRepository.findAll();
    }

    public List<Favorite> getFavorite(String id){
        int favorite_id = Integer.valueOf(id);
        return favoriteRepository.findAllByUser_id(favorite_id);
    }

    public Favorite addFavorite(Favorite favorite, int post_id, int user_id){
        User user = userRepository.findById(user_id).orElse(null);
        Post post = postRepository.findById(post_id).orElse(null);

        favorite.setUser(user);
        favorite.setPost(post);

        return favoriteRepository.save(favorite);
    }

    public void deleteFavorite(String id){
        int favorite_id = Integer.valueOf(id);
        favoriteRepository.deleteById(favorite_id);

    }




    }


