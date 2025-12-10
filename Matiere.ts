import { Seance } from "./Seance";

export class Matiere {
    nom: string;
    nb_paquets: number;
    seance: Seance;


    constructor(nom: string, nb_paquets: number, seance: Seance){
        this.nom = nom;
        this.nb_paquets = nb_paquets;
        this.seance = seance;
    }

    toString(): string {
        return `Matiere [nom=${this.nom}, nb_paquets=${this.nb_paquets}, seance=${this.seance}]`;
    }

    equals(other: Matiere): boolean {
        if (!(other instanceof Matiere)) {
            return false;
        }
        return this.nom === other.nom;
    }
  }