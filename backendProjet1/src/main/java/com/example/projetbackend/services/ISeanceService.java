package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;

import com.example.projetbackend.entities.Seance;

public interface ISeanceService {
	 public List<Seance> getAllSeances();
	 public Optional<Seance> getSeanceById(int id) ;

}
