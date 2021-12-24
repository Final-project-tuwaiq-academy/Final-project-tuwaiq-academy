package com.example.Final_Project.Posts;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PostRepositoryTest {

    private final PostRepository postRepository;

    @Autowired
    public PostRepositoryTest(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Test
    void itShouldFindPost() {
        Post post = new Post();
        post.setPost_id(2);
        post.setTitle("Post1");
        Post savedPost = postRepository.save(post);

        Post result = postRepository.findById(savedPost.getPost_id()).orElse(null);

        assertNotNull(result);
    }

    @Test
    void itShouldSavePost() {
        Post post = new Post();
        post.setPost_id(3);
        Post result = postRepository.save(post);
        assertTrue(String.valueOf(result.getPost_id()) != null);
    }
    
}