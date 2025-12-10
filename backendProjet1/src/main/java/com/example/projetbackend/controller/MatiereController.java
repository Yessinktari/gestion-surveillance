package com.example.projetbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetbackend.entities.Matiere;
import com.example.projetbackend.services.IMatiereService;

@RestController
@RequestMapping("/api/matieres")
public class MatiereController {

   
	 private final IMatiereService MatiereService;

	    public MatiereController(IMatiereService MatiereService) {
	        this.MatiereService = MatiereService;
	    }
	    
	    
	    
	    @GetMapping
	    public List<Matiere> getAll() {
	        return MatiereService.getAllMatieres();
	    }
	    
	    
	    @GetMapping("/planifiee")
	    public List<Matiere> getMatierePlanifiee() {
	        return MatiereService.getMatieresPlanifiees();
	    }
	    
	    
	    @GetMapping("/planifiee/count")
	    public Long getNombreMatieresPlanifiees() {
	        return MatiereService.getNombreMatieresPlanifiees();
	    }
	    
}
