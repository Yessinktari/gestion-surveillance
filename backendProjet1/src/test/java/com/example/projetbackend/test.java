package com.example.projetbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.projetbackend.*;
import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.entities.Grade;
import com.example.projetbackend.entities.Matiere;
import com.example.projetbackend.entities.Seance;
import com.example.projetbackend.repository.EnseignantRepository;
import com.example.projetbackend.services.EnseignantService;

@ExtendWith(MockitoExtension.class)
class test {
	
	@Mock
    private EnseignantRepository enseignatRepo;

    @InjectMocks
    private EnseignantService enseignantService;

	@Test
	void testCalculerNombreSeances() {

	    Grade grade = new Grade();
	    grade.setGrade(1);
	    grade.setNom("Assistant");
	    grade.setChargeSurveillance(10);

	    Seance s2 = new Seance();
	    s2.setId(2);

	    Seance s6 = new Seance();
	    s6.setId(6);

	    Matiere m1 = new Matiere();
	    m1.setNom("Bases de Données");
	    m1.setNbPaquets(4);
	    m1.setSeance(s2);

	    Matiere m2 = new Matiere();
	    m2.setNom("Programmation Java");
	    m2.setNbPaquets(5);
	    m2.setSeance(s6);


	    Enseignant e = new Enseignant();
	    e.setId(1);
	    e.setNom("Ktari");
	    e.setPrenom("Yessin");
	    e.setEmail("yessinktari05@gmail.com");
	    e.setGrade(grade);
	    e.setMatieresEnseignees(Arrays.asList(m1, m2));

	    // -------- Mock du repository --------
	    when(enseignatRepo.findById(1)).thenReturn(Optional.of(e));

	    // -------- Test du service --------
	    double result = enseignantService.getNbSeancesASurveiller(1);

	    // -------- Vérification --------
	    assertEquals(13, result);
	}

}
