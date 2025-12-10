package com.example.projetbackend.services;

import java.util.List;
import java.util.Optional;
import com.example.projetbackend.repository.SeanceRepository;
import org.springframework.stereotype.Service;
import com.example.projetbackend.entities.Enseignant;
import com.example.projetbackend.entities.Seance;
import com.example.projetbackend.repository.EnseignantRepository;

@Service
public class EnseignantService implements IEnseignantService {

    private final SeanceRepository seanceRepository;

	private final EnseignantRepository enseignantRepository;
	
	
	  public EnseignantService(EnseignantRepository enseignantRepository, SeanceRepository seanceRepository) {
	        this.enseignantRepository = enseignantRepository;
	        this.seanceRepository = seanceRepository;
	    }

	  
	  public boolean verifierAuthentification(String login, String password) {
		  Optional<Enseignant> enseignantOpt = enseignantRepository.findByEmail(login);
	        if (enseignantOpt.isPresent()) {
	            Enseignant enseignant = enseignantOpt.get();
	            return enseignant.getPassword().equals(password);
	            
	          
	        }
	        return false;
	    }
	  
	  @Override
	    public Optional<Enseignant> getEnseignantByLogin(String login) {
	        return enseignantRepository.findByEmail(login);
	    }
	  
	  @Override
	  public double getNbSeancesASurveiller(int id) {
	      Enseignant enseignant = enseignantRepository.findById(id)
	          .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
	      return enseignant.getNbSeancesASurveiller();
	  }
	  
	  
	    public List<Enseignant> getAllEnseignants() {
	        return enseignantRepository.findAll();
	    }
	    
	    
	    public Optional<Enseignant> getEnseignantByLogin(String email, String password) {
	        return enseignantRepository.findByEmailAndPassword(email, password);
	    }
	    
	    
	    public Optional<Enseignant> getEnseignantById(int id) {
	        return enseignantRepository.findById(id);
	    }
	    
	    @Override
	    public int getNbSeancesAffectees(int enseignantId) {
	        Optional<Enseignant> enseignant = enseignantRepository.findById(enseignantId);
	        return enseignant.map(Enseignant::getNbSeancesAffectees).orElse(0);
	    }

	    @Override
	    public List<Seance> getSeancesByEnseignantId(int id) {
	        return enseignantRepository.findSeancesByEnseignantId(id);
	    }
	    
	    @Override
	    public Enseignant ajouterSeance(int enseignantId, Seance seance) {
	        Enseignant enseignant = enseignantRepository.findById(enseignantId)
	                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
	        enseignant.getSeances().add(seance);
	        seance.setEnseignantsAffecte(seance.getEnseignantsAffecte() + 1);   
	               seanceRepository.save(seance);
	        return enseignantRepository.save(enseignant);
	    }
	    
	    @Override
	    public Enseignant supprimerSeance(int enseignantId, int seanceId) {
	        Enseignant enseignant = enseignantRepository.findById(enseignantId)
	                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé"));
	        Seance seance = seanceRepository.findById(seanceId)
	                .orElseThrow(() -> new RuntimeException("Séance non trouvée"));
	        enseignant.getSeances().remove(seance);
	        seance.setEnseignantsAffecte(seance.getEnseignantsAffecte() - 1);
	        seanceRepository.mettreAJourNbEnseignantsAffectes();
	        enseignantRepository.save(enseignant);
	        seanceRepository.save(seance);
	        return enseignant;
	    }

	   
}

