package com.example.projetbackend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.projetbackend.entities.Seance;
import com.example.projetbackend.services.ISeanceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seances")
@RequiredArgsConstructor
public class SeanceController {

	 private final ISeanceService SeanceService;
	
	
	 @GetMapping
	    public List<Seance> getAll() {
	        return SeanceService.getAllSeances();
	    }

	    @GetMapping("/{id}")
	    public Optional<Seance> getById(@PathVariable int id) {
	        return SeanceService.getSeanceById(id);
	    }
	    
	    
	    
	   
	    
	    
}
