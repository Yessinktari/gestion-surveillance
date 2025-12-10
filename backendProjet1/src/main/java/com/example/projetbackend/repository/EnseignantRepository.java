package com.example.projetbackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.entities.Seance;


@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Integer> {
	
	    Optional<Enseignant> findByEmail(String email);
	    boolean existsByEmail(String email);
	 Optional<Enseignant> findByNom(String nom);
	  Optional<Enseignant> findByEmailAndPassword(String email, String password);
	  @Query("SELECT e.seances FROM Enseignant e WHERE e.id = :id")
	    List<Seance> findSeancesByEnseignantId(@Param("id") int enseignantId);
	  
	  

}
