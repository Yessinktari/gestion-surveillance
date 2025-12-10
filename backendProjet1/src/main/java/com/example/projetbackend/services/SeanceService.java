package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.projetbackend.entities.Seance;
import com.example.projetbackend.repository.SeanceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeanceService implements ISeanceService {
	
	private final SeanceRepository seanceRepository;
	

	
	  // Récupérer tous
    public List<Seance> getAllSeances() {
        return seanceRepository.findAll();
    }
    
    // Récupérer un seance par ID
    public Optional<Seance> getSeanceById(int id) {
        return seanceRepository.findById(id);
    }

}
