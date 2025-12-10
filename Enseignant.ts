import { Grade } from "./Grade";

export class Enseignant {
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    login: string;
    password?: string;
    grade?: Grade;

    constructor(id: number, nom: string, prenom: string, tel: string, login: string, password?: string, grade?: Grade){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel ?? '';
        this.login = login;
        this.password = password;
        this.grade = grade;
    }
        
            toString(): string {
                return `Enseignant [id=${this.id}, nom=${this.nom}, prenom=${this.prenom}]`;
            }
        
        
            equals(other: Enseignant): boolean {
                if (!(other instanceof Enseignant)) {
                    return false;
                }
                return this.id === other.id;
            }
}