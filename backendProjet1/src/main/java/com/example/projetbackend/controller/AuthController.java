package com.example.projetbackend.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetbackend.dto.LoginRequest;
import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

	@Autowired
    private AuthService authService;
    
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello World";
    }
    
    @PostMapping("/login")
    public Optional<Enseignant> login(@RequestBody LoginRequest request) {
        return authService.login(request.getLogin(), request.getPassword());
    }
    }
	
	
