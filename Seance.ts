
export class Seance {
    id: number;
  date_debut: Date;
  date_fin: Date;
  date_epreuve: Date;
  filiere: string;
  niveau: string;
  LimiteEnseignants: number;

    constructor(id: number, date_debut: Date, date_fin: Date, date_epreuve: Date, filiere: string, niveau: string, LimiteEnseignants: number){
        this.id = id;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.date_epreuve = date_epreuve;
        this.filiere = filiere;
        this.niveau = niveau;
        this.LimiteEnseignants = LimiteEnseignants;
    }
        
            toString(): string {
                return `Seance [id=${this.id}, date_debut=${this.date_debut}, date_fin=${this.date_fin}, date_epreuve=${this.date_epreuve}, filiere=${this.filiere}, niveau=${this.niveau}]`;
            }
        
        
            equals(other: Seance): boolean {
                if (!(other instanceof Seance)) {
                    return false;
                }
                return this.id === other.id;
            }
}