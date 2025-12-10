package com.example.projetbackend.entities;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Horaire {
	
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
	  @Column(name = "Heure_debut", nullable = false)
   private LocalTime Hdeb;
	  @Column(name = "Heure_fin", nullable = false)
   private LocalTime Hfin;

}
