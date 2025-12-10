package com.example.projetbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@EqualsAndHashCode(of = {"nom"})
@Getter
@Setter

public class Matiere {
	
	@Id
	private String nom;
	private int nbPaquets;
	
	@ManyToOne
    @JoinColumn(name = "seance")
	@JsonIgnore
    private Seance seance;
	
	    
	
}
