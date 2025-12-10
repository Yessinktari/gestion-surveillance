package com.example.projetbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.projetbackend.entities.Seance;

import jakarta.transaction.Transactional;

@Repository
public interface SeanceRepository extends JpaRepository<Seance, Integer> {

    @Modifying
    @Transactional
    @Query(value = """
      UPDATE Seance s JOIN (
      SELECT seances_id, COUNT(*) AS nb_enseignants
      FROM Enseignant_Seances
      GROUP BY seances_id)
      es ON s.id = es.seances_id
      SET s.enseignants_affectés = es.nb_enseignants;
        """, nativeQuery = true)
    void mettreAJourNbEnseignantsAffectes();
}
