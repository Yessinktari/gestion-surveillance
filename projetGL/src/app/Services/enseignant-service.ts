import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Grade {
  grade: number;
  nom: string;
  charge_surveillance: number;
}

export interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
  tel?: string;
  login: string;
  password?: string;
  grade?: Grade;
}

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  private apiUrl = 'http://localhost:8080/api/enseignants'; 

  constructor(private http: HttpClient) { }

  // Récupérer tous les enseignants
  getAllEnseignants(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getEnseignantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  ajouterSeance(enseignantId: number, seance: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${enseignantId}/seances`, seance);
  }

  supprimerSeance(enseignantId: number, seanceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${enseignantId}/seances/${seanceId}`);
  }

  getSeancesByEnseignant(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/seances`);
  }

  getNbSeancesSurveillance(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/nbSeancesSurveillance`);
  }
  
}
