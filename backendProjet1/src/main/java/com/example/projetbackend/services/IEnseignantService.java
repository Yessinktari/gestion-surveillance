package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;

import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.entities.Seance;

public interface IEnseignantService {

	 public boolean verifierAuthentification(String login, String password);
	 public Optional<Enseignant> getEnseignantByLogin(String login);
	 public List<Enseignant> getAllEnseignants();
	 public Optional<Enseignant> getEnseignantById(int id);
	 double getNbSeancesASurveiller(int id);
	  Optional<Enseignant> getEnseignantByLogin(String email, String password);
	  int getNbSeancesAffectees(int enseignantId);
	  List<Seance> getSeancesByEnseignantId(int id);
	  Enseignant ajouterSeance(int enseignantId, Seance seance);
	  Enseignant supprimerSeance(int enseignantId, int seanceId);
}
