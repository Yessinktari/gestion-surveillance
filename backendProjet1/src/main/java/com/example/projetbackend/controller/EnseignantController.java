package com.example.projetbackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.entities.Seance;
import com.example.projetbackend.services.IEnseignantService;


@RestController
@RequestMapping("/api/enseignants")
public class EnseignantController {
	
	 private IEnseignantService enseignantService;

    public EnseignantController(IEnseignantService enseignantService) {
        this.enseignantService = enseignantService;
    }
       
    @GetMapping("/{id}/nbSeancesSurveillance")
    public double getNbSeancesSurveillance(@PathVariable int id) {
        return enseignantService.getNbSeancesASurveiller(id);
    }

    @GetMapping
    public List<Enseignant> getAll() {
        return enseignantService.getAllEnseignants();
    }
    
    @GetMapping("/{id}")
    public Optional<Enseignant> getById(@PathVariable int id) {
        return enseignantService.getEnseignantById(id);
    }
    
    @GetMapping("/{id}/nbSeancesAffectees")
    public int getNbSeancesAffectees(@PathVariable int id) {
        return enseignantService.getNbSeancesAffectees(id);
    }

  
    @PostMapping("/login")
    public Optional<Enseignant> login(@RequestParam String email, @RequestParam String password) {
        return enseignantService.getEnseignantByLogin(email, password);
    }
    
    
    @GetMapping("/{id}/seances")
    public ResponseEntity<List<Seance>> getSeances(@PathVariable int id) {
        List<Seance> seances = enseignantService.getSeancesByEnseignantId(id);
        return ResponseEntity.ok(seances);
    }
  
    
    @PostMapping("/{id}/seances")
    public ResponseEntity<Enseignant> ajouterSeance(@PathVariable int id,@RequestBody Seance seance) {
        Enseignant enseignant = enseignantService.ajouterSeance(id, seance);
        return ResponseEntity.ok(enseignant);
    }
    
    @DeleteMapping("/{id}/seances/{seanceId}")
    public ResponseEntity<Enseignant> supprimerSeance(@PathVariable int id,@PathVariable int seanceId) {
        Enseignant enseignant = enseignantService.supprimerSeance(id, seanceId);
        return ResponseEntity.ok(enseignant);
    }
    
    
}
