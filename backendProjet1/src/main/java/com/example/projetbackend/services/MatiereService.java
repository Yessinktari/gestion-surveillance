package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.projetbackend.entities.Matiere;
import com.example.projetbackend.repository.MatiereRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MatiereService implements IMatiereService {
	

	private final MatiereRepository MatiereRepository;
	
	  // Récupérer tous
    public List<Matiere> getAllMatieres() {
        return MatiereRepository.findAll();
    }
    
    
    public List<Matiere> getMatieresPlanifiees() {
        return MatiereRepository.findBySeanceIsNotNull();
    }
    
    public Long getNombreMatieresPlanifiees() {
        return MatiereRepository.countBySeanceIsNotNull();
    }
    
    

    // Récupérer un seance par ID
    public Optional<Matiere> getMatiereById(String id) {
        return MatiereRepository.findById(id);
    }

}
