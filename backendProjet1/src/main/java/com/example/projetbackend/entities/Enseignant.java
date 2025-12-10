package com.example.projetbackend.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Enseignant {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String prenom;
    private String tel;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false,unique = true)
    private String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grade" )
    private Grade grade;
    private String section;

    @ManyToMany
    private List<Seance> seances = new ArrayList<>();
    @ManyToMany
    @JoinTable(
    		name = "Enseignant_matieresEnseignees",
    		joinColumns = @JoinColumn(name = "enseignant_id"),inverseJoinColumns = @JoinColumn(name ="matieresEnseignees_id"))
    private List<Matiere> matieresEnseignees = new ArrayList<>();
    
    
    
    
    
    public double getNbSeancesASurveiller() {
        if (grade == null) return 0;
        double charge = grade.getChargeSurveillance() * 1.5;
        int nbSeancesMatieres = 0;
        if (matieresEnseignees != null) {
            for (Matiere mat : matieresEnseignees) {
                if (mat.getSeance() != null) {
                    nbSeancesMatieres++;
                }
            }
        }
        return charge - nbSeancesMatieres;
    }
    
    public int getNbSeancesAffectees() {
        return seances != null ? seances.size() : 0;
    }
    
   
}
