import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private apiUrl = 'http://localhost:8080/api/seances';

  constructor(private http: HttpClient) {}

  getAllSeances(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSeanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  

  affecterEnseignant(seanceId: number, enseignantId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${seanceId}/affecter/${enseignantId}`, {});
  }

}
