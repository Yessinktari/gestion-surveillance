import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { EnseignantService } from '../Services/enseignant-service';
import { SeanceService } from '../Services/seance-service';
import { MatiereService } from '../Services/matiere-service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterModule,MatCardModule, MatDatepickerModule, MatIconModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  user: any;
  EnseignantCourant:any;

  seances: any[] = [];
  matieres: any[] = [];
  jours: string[] = [];
  horaires: string[] = [];

  SeancesParJour: any = {};

  SeanceChoisi: any[] = [];
  dateImpression = new Date();
  messageErreur: string | null = null;

  showGuide = false;
  MatiereEnseigne: any[] = [];

  constructor(
    private EnseignantService: EnseignantService,
    private SeanceService: SeanceService,
    private MatiereService: MatiereService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    }
  }



  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  loadEnseignant() {
    this.EnseignantService.getEnseignantById(this.EnseignantCourant.id)
      .subscribe((res: any) => {
        this.EnseignantCourant = res;
        this.SeanceChoisi = res.seances;
        
        this.EnseignantCourant.nbSeancesAffectees = res.nbSeancesAffectees;
        console.log('Seances chargées :', this.SeanceChoisi);
        this.cdr.markForCheck(); // Mise à jour en temps réel
      }, err => {
        console.error('Erreur lors du chargement des séances :', err);
      });
  }

    
    ngOnInit() {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.EnseignantCourant = JSON.parse(storedUser);
          console.log("connexion réussie", this.EnseignantCourant);
          this.loadEnseignant();
          this.chargerMatrice();
        } else {
          console.warn('Utilisateur non trouvé');
          this.router.navigate(['/login']);
        }
      }
    }


  Profile() {
    console.log('Navigation vers Profile...');
    this.router.navigate(['Profile']);
  }

  chargerMatrice(): void {
   
    this.MatiereService.getAllMatieres().subscribe((matieres: any[]) => {
      this.matieres = matieres;
      console.log(this.matieres);
  
      this.SeanceService.getAllSeances().subscribe((seances: any[]) => {
        this.seances = seances;
        console.log(this.seances);
  
        const joursSet = new Set<string>();
        const horairesSet = new Set<string>();
  
        // Extraire tous les jours et horaires uniques
        seances.forEach((s) => {
          joursSet.add(s.dateEpreuve);
          const horaireKey = `${s.horaire.hdeb.slice(0, 5)}-${s.horaire.hfin.slice(0, 5)}`;
          horairesSet.add(horaireKey);
        });
  
        this.jours = Array.from(joursSet).sort();
        this.horaires = Array.from(horairesSet).sort();
  
        // Construire la matrice SeancesParJour[jour][horaire]
        this.SeancesParJour = {};
        this.jours.forEach(jour => {
          this.SeancesParJour[jour] = {};
          this.horaires.forEach(horaire => {
            // Cherche la séance correspondante
            const seance = seances.find(s =>
              s.dateEpreuve === jour &&
              `${s.horaire.hdeb.slice(0, 5)}-${s.horaire.hfin.slice(0, 5)}` === horaire
            );
            this.SeancesParJour[jour][horaire] = seance || null; // null si pas de séance
          });
        });
  
        console.log('SeancesParJour:', this.SeancesParJour);
        this.cdr.markForCheck(); // Déclencher la détection de changement pour OnPush

      });
    });
  }



  selectionnerSeance(seance: any) {
    if (!seance) return;
  
    // 1️⃣ C'est son devoir
    if (this.estMonDevoir(seance)) {
      Swal.fire({
        icon: 'info',
        title: 'Attention',
        text: "Cette séance correspond à votre devoir.",
        confirmButtonText: 'OK'
      });
      return;
    }
  
    // 2️⃣ Il a déjà choisi ce créneau → possibilité de désinscription
    if (this.estDejaChoisi(seance)) {
      Swal.fire({
        icon: 'info',
        titleText: 'Vous avez déjà choisi une séance pour ce créneau.',
        text: `Vous êtes inscrit pour surveiller une séance durant ce créneau.`,
        confirmButtonText: '<i class="bi bi-x-circle"></i> Se désinscrire',
        cancelButtonText: 'Annuler',
        showCancelButton: true,
        background: '#f0f9ff',
        color: '#0c4a6e',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#0c4a6e',
      }).then((result) => {
        if (result.isConfirmed) {
          this.EnseignantService.supprimerSeance(this.EnseignantCourant.id, seance.id)
            .subscribe({
              next: (res) => {
                this.EnseignantCourant = res;
                this.SeanceChoisi = res.seances;
                this.cdr.markForCheck(); // Mise à jour en temps réel
                Swal.fire({
                  icon: 'success',
                  title: 'Séance supprimée',
                  text: 'La séance a été supprimée avec succès.',
                  confirmButtonColor: '#28a745'
                });
              },
              error: () => {
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: "Impossible de supprimer la séance.",
                  confirmButtonColor: '#dc3545'
                });
              }
            });
        }
      });
  
      return;
    }
  
    // 3️⃣ Elle n'est pas disponible
    if (!this.estDisponible(seance)) {
      Swal.fire({
        icon: 'error',
        title: 'Indisponible',
        text: "Cette séance est complète ou indisponible.",
        confirmButtonText: 'OK'
      });
      return;
    }
  
    // 4️⃣ Il peut encore choisir une séance
    if (this.EnseignantCourant.nbSeancesAffectees < this.EnseignantCourant.nbSeancesASurveiller) {

          this.EnseignantService.ajouterSeance(this.EnseignantCourant.id, seance)
            .subscribe({
              next: (res) => {
                this.EnseignantCourant = res;
                this.SeanceChoisi = res.seances;
                this.cdr.markForCheck(); // Mise à jour en temps réel
              },
              error: () => {
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: "Impossible d'ajouter la séance.",
                  confirmButtonColor: '#dc3545'
                });
              }
            });
            return;
        }

    Swal.fire({
      icon: 'warning',
      title: 'Limite atteinte',
      text: 'Vous avez atteint le nombre maximal de séances.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f59e0b'
    });
  }
  
// Retourne uniquement les matières de la séance que l'enseignant enseigne
getMatieresEnseigneesDansSeance(matieres: any): any {
  if (!matieres || !this.EnseignantCourant) return [];
  return matieres.filter((m: any) =>
    this.EnseignantCourant.matieresEnseignees.some((em: any) => em.nom === m.nom)
  );
}


  // Méthode helper pour vérifier si une matière est enseignée par l'enseignant
  estMatiereEnseignee(matieres: any): boolean {
    if (!matieres || !this.EnseignantCourant) return false;
    return matieres.some((m: any) => this.EnseignantCourant.matieresEnseignees.some((em: any) => em.nom === m.nom));
  }

  estDejaChoisi(seance: any): boolean {
      if (!seance || !this.SeanceChoisi) return false;
      return this.SeanceChoisi.some((s: any) => s.id === seance.id);
  }

  estDisponible(seance: any): boolean {
    if (!seance) return false; // pas de séance → pas disponible
    return seance.enseignantsAffecte < seance.limiteEnseignants;
  }

  // Méthode helper pour vérifier si c'est mon devoir
  estMonDevoir(seance: any): boolean {
    if (!seance) return false;
    
    // Vérifier si la séance a une matière et si cette matière est enseignée par l'enseignant
    const matiere = seance.matiere || seance.matiereSeance;
    return this.estMatiereEnseignee(matiere);
  }

  getNomMatiere(seance: any): string {
    if (!seance) return '--';
    if (seance.nomMatiere) return seance.nomMatiere;
    if (seance.matiere) {
      if (typeof seance.matiere === 'object') {
        return seance.matiere.nom || '';
      }
      return seance.matiere;
    }
    return seance.matiereSeance?.nom || '';
  }

  formatHoraire(seance: any): string {
    if (!seance) {
      return '--';
    }
    const debut = seance?.horaire?.hdeb || seance?.horaire?.heureDebut || '--';
    const fin = seance?.horaire?.hfin || seance?.horaire?.heureFin || '--';
    return `${debut} - ${fin}`;
  }

  getSalle(seance: any): string {
    if (!seance) return '—';
    return seance.salle?.nom || seance.salle?.code || seance.salle || '—';
  }

  getFiliere(seance: any): string {
    if (!seance) return '';
    if (typeof seance.filiere === 'string') return seance.filiere;
    if (seance.filiere?.nom) return seance.filiere.nom;
    return seance.section || seance.parcours || '';
  }

  get joursAvecDevoir(): string[] {
    return this.jours.filter(jour =>
      this.horaires.some(horaire => {
        const s = this.SeancesParJour[jour]?.[horaire];
        return !!s && this.estMatiereEnseignee(s.matieres);
      })
    );
  }
  

  getClasseLibelle(seance: any): string {
    if (!seance) return '—';
    const niveau = seance.niveau || seance.classe || seance.promotion || '';
    const filiere = this.getFiliere(seance);
    const libelle = [niveau, filiere].filter(Boolean).join(' ');
    return libelle || '—';
  }

  getTotalHeuresVoeux(): string {
    if (!this.SeanceChoisi?.length) return '0h';
    const total = this.SeanceChoisi.reduce((acc, s) => acc + this.getDureeSeance(s), 0);
    const formatted = Number.isInteger(total) ? total : Number(total.toFixed(1));
    return `${formatted}h totales`;
  }

  private getDureeSeance(seance: any): number {
    if (!seance?.horaire) return 0;
    const debut = this.parseHoraireMinutes(seance.horaire.hdeb || seance.horaire.heureDebut);
    const fin = this.parseHoraireMinutes(seance.horaire.hfin || seance.horaire.heureFin);
    if (debut === null || fin === null || fin <= debut) return 0;
    return (fin - debut) / 60;
  }

  private parseHoraireMinutes(horaire?: string): number | null {
    if (!horaire) return null;
    const [heures, minutes] = horaire.split(':').map(Number);
    if (Number.isNaN(heures)) return null;
    return heures * 60 + (Number.isNaN(minutes) ? 0 : minutes);
  }



  fermerMessageErreur(): void {
    this.messageErreur = null;
  }
  
  imprimerVoeux(): void {

    if (this.EnseignantCourant?.nbSeancesAffectees !== this.EnseignantCourant?.nbSeancesASurveiller) {
      this.messageErreur = "Le nombre de séances affectées n'est pas égal aux séances à surveiller.";
      setTimeout(() => {
        this.messageErreur = null;
      }, 2000); // 3 secondes
    
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.dateImpression = new Date();
  
      const content = document.querySelector('.fiche-impression')?.innerHTML;
      if (content) {
        const printWindow = window.open('', '', 'height=800,width=1200');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <style>
                  body {
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    padding: 1rem;
                    color: #0f172a;
                    background: #fff;
                    margin: 0;
                  }
  
                  .fiche-impression {
                    width: 100%;
                    page-break-inside: avoid; /* Empêche le saut de page à l'intérieur de la fiche */
                  }
  
                  .fiche-hero { text-align: center; margin-bottom: 1rem; }
                  .fiche-info-card {
                    border: 1px solid #d1d5db;
                    border-radius: 16px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                    page-break-inside: avoid;
                  }
  
                  .fiche-info-card p { margin: 0.25rem 0; }
                  
                  .fiche-table-wrapper table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.85rem;
                    page-break-inside: avoid;
                  }
  
                  .fiche-table-wrapper th, .fiche-table-wrapper td {
                    border: 1px solid #1f2937;
                    padding: 0.35rem 0.5rem;
                    text-align: left;
                  }
  
                  .fiche-table-wrapper thead { background: #f3f4f6; }
  
                  .fiche-total {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid #0f172a;
                    border-radius: 12px;
                    display: inline-block;
                    font-weight: 600;
                    page-break-inside: avoid;
                  }
  
                  .fiche-signatures {
                    display: flex;
                    justify-content: space-between;
                    gap: 2rem;
                    margin: 2rem 0 3rem;
                    font-size: 0.85rem;
                    page-break-inside: avoid;
                  }
  
                  .fiche-footer {
                    border-top: 1px solid #0f172a;
                    padding-top: 0.5rem;
                    text-align: center;
                    font-size: 0.8rem;
                    page-break-inside: avoid;
                  }
  
                  /* Ajuste la taille si le contenu est trop grand */
                  table, tr, td, th {
                    page-break-inside: avoid !important;
                  }
  
                  @media print {
                    body { -webkit-print-color-adjust: exact; }
                  }
                </style>
              </head>
              <body>
                <div class="fiche-impression">
                  ${content}
                </div>
              </body>
            </html>
          `);
          this.messageErreur = null;
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        }
      } else {
        console.error('Section à imprimer introuvable');
      }
    } else {
      console.log('Impression disponible uniquement côté navigateur.');
    }
  }
  

  // 4️⃣ Méthode pour formater les dates
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Novembre', 'Déc'];
    return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]}`;
  }


  }
  






  
