package com.example.projetbackend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.repository.EnseignantRepository;

@Service
public class AuthService {

	  @Autowired
	    private EnseignantRepository enseignantRepo;

	    public Optional<Enseignant> login(String email, String password) {
	        Optional<Enseignant> e = enseignantRepo.findByEmailAndPassword(email, password);
	        if (e == null) {
	            throw new RuntimeException("Login ou mot de passe invalide");
	        }
	        return e;
	    }
}
