package com.example.projetbackend.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

	@Entity
	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@Setter
	public class Seance {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id; 

	    @Column(name = "date_epreuve", nullable = false)
	    private LocalDate dateEpreuve;

	    @ManyToOne
	    @JoinColumn(name = "Horaire")
	   private Horaire horaire; 
	    @Column(name="LimiteEnseignants" , length = 2 )
	    private int LimiteEnseignants = 0 ;	
	    @Column(name="Enseignants_Affectés" , length = 2 , updatable = true)
	    private int enseignantsAffecte = 0;
	    @OneToMany(mappedBy = "seance")
	    private Set<Matiere> matieres = new HashSet<>();
	    
	    
	    
	    public void calculerLimite() {
	        if (matieres == null || matieres.isEmpty()) {
	            this.LimiteEnseignants = 0;
	            return;
	        }
	        int totalPaquets = 0;
	        for (Matiere m : matieres) {
	            totalPaquets += m.getNbPaquets();
	        }
	        this.setLimiteEnseignants((int) Math.ceil(totalPaquets * 1.5));
	    }
	   
	    
	}
