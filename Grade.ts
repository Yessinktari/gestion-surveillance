    export class Grade {
    grade: number;
    nom: string;
    charge_surveillance: number;

    constructor(grade: number, nom: string, charge_surveillance: number){
        this.grade = grade;
        this.nom = nom;
        this.charge_surveillance = charge_surveillance;
    }

    toString(): string {
        return `Grade [grade=${this.grade}, nom=${this.nom}, charge_surveillance=${this.charge_surveillance}]`;
    }

    equals(other: Grade): boolean {
        if (!(other instanceof Grade)) {
            return false;
        }
        return this.grade === other.grade;
    }
}