package com.example.Final_Project.Post_Price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Post_PriceRepository extends JpaRepository<Post_Price, Integer> { }