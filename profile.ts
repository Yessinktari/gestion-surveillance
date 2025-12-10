import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { EnseignantService} from '../Services/enseignant-service'
import { SeanceService } from '../Services/seance-service'
import { MatiereService } from '../Services/matiere-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user: any;
  EnseignantCourant:any;

  seances: any[] = [];
  matieres: any[] = [];
  jours: string[] = [];
  horaires: string[] = [];

  SeancesParJour: any = {};

  SeanceChoisi: any[] = [];
  dateImpression = new Date();


  constructor(private EnseignantService:EnseignantService,private SeanceService:SeanceService, private MatiereService:MatiereService, public router: Router, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }


  ngOnInit() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.EnseignantCourant = JSON.parse(storedUser);
        console.log("connexion réussie", this.EnseignantCourant);
        this.loadEnseignantDetails();
      } else {
        console.warn('Utilisateur non trouvé');
        this.router.navigate(['/login']);
      }
    }
  }

  loadEnseignantDetails() {
    if (this.EnseignantCourant?.id) {
      this.EnseignantService.getEnseignantById(this.EnseignantCourant.id).subscribe({
        next: (enseignant: any) => {
          this.EnseignantCourant = enseignant;
          this.SeanceChoisi = enseignant.seances || [];
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails:', err);
        }
      });
    }
  }

  getInitiales(): string {
    if (!this.EnseignantCourant) return '';
    const nom = this.EnseignantCourant.nom || '';
    const prenom = this.EnseignantCourant.prenom || '';
    return ( prenom.charAt(0) + nom.charAt(0)).toUpperCase();
  }

  getTitre(): string {
    if (!this.EnseignantCourant) return '';
    const grade = this.EnseignantCourant.grade?.nom || '';
    if (grade.toLowerCase().includes('docteur') || grade.toLowerCase().includes('doctor')) {
      return 'Dr.';
    }
    return 'Dr.';
  }

  getSpecialisation(): string {
    if (!this.EnseignantCourant) return '—';
    const section = this.EnseignantCourant.section || this.EnseignantCourant.departement?.nom || '';
    const matieresEnseignees = Array.isArray(this.EnseignantCourant.matieresEnseignees)
    ? this.EnseignantCourant.matieresEnseignees.map((m: any) => m.nom).join(' & ')
    : '';

  if (section && matieresEnseignees) {
    return `${section} - ${matieresEnseignees}`;
  }

  return section || matieresEnseignees || '—';
  }

  getEmail(): string {
    if (!this.EnseignantCourant) return '—';
    return this.EnseignantCourant.email || this.EnseignantCourant.login || '—';
  }

  getTelephone(): string {
    if (!this.EnseignantCourant) return '—';
    return this.EnseignantCourant.tel || '—';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Novembre', 'Déc'];
    return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]}`;
  }

  formatHoraire(seance: any): string {
    if (!seance?.horaire) return '—';
    const hdeb = seance.horaire.hdeb || seance.horaire.heureDebut || '';
    const hfin = seance.horaire.hfin || seance.horaire.heureFin || '';
    if (!hdeb || !hfin) return '—';
    return `${hdeb} - ${hfin}`;
  }

  

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  Accueil() {
    console.log('Navigation vers Accueil...');
    this.router.navigate(['Accueil']);
  }

}
