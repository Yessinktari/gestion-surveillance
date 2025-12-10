package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;

import com.example.projetbackend.entities.Matiere;

public interface IMatiereService {

	public List<Matiere> getAllMatieres();
	public List<Matiere> getMatieresPlanifiees();
	 public Long getNombreMatieresPlanifiees();
	 public Optional<Matiere> getMatiereById(String id);
}
