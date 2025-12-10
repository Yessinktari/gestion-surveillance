package com.example.projetbackend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projetbackend.entities.Matiere;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere,String> {


	List<Matiere> findBySeanceIsNotNull();
	Long countBySeanceIsNotNull();
}
