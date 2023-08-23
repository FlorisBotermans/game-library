import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Developer } from '../models/developer.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private developers: Developer[];
  private developer: Developer;
  private developersUpdated = new Subject<{ developers: Developer[] }>();
  private developerUpdated = new Subject<{ developer: Developer }>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getDevelopersUpdateListener() {
    return this.developersUpdated.asObservable();
  }

  getDeveloperByIdUpdateListener() {
    return this.developerUpdated.asObservable();
  }

  createDeveloper(gameId: string, formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/games/` + gameId + '/developers', formValue)
      .subscribe((response) => {
        this.router.navigate(['details/' + gameId]);
      });
  }

  getDevelopers(gameId: string) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId + '/developers')
      .subscribe((response) => { 
        this.developers = response;
        this.developersUpdated.next({ developers: [...this.developers] });
      });  
  }

  getDeveloperById(gameId: string, developerId: string) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId + '/developers/' + developerId)
      .subscribe((response) => {
        this.developer = response;
        this.developerUpdated.next({ developer: { ...this.developer } })
      });
  }

  updateDeveloper(gameId: string, developerId: string, formValue: any) {
    this.http.put<any>(`${this.apiUrl}api/games/` + gameId + '/developers/' + developerId, formValue)
      .subscribe((response) => {
        this.router.navigate(['details/' + gameId]);
      });
  }

  deleteDeveloper(gameId: string, developerId: string) {
    this.http.delete(`${this.apiUrl}api/games/` + gameId + '/developers/' + developerId)
      .subscribe((response) => {
        this.getDevelopers(gameId);
      });
  }
}
