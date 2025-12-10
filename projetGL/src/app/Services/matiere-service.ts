import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  

  private apiUrl = 'http://localhost:8080/api/matieres';

  constructor(private http: HttpClient) {}

  getAllMatieres(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  GetMatierePlanifiee(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planifiee`);
  }

  GetNbMatierePlanifiee(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/planifiee/count`);
  }


  

  getMatiereById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
