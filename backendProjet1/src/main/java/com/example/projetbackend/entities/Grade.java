package com.example.projetbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@EqualsAndHashCode(of = "grade")
@Table(name = "Grade")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
	public class Grade {
	     @Id
	     @GeneratedValue(strategy=GenerationType.IDENTITY)
		private int grade;
	     private String nom;
		private int chargeSurveillance;
		
	
	}
