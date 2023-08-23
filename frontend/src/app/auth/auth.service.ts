import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedListener = new Subject<boolean>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getIsAuthenticatedListener() {
    return this.isAuthenticatedListener.asObservable();
  }

  register(formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/register`, formValue)
      .subscribe((response) => {
        this.router.navigate(['login']);
      }, (error) => {});
  }

  login(formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/login`, formValue)
      .subscribe((response) => {
        localStorage.setItem('token', response.toString());
        this.isAuthenticatedListener.next(true);
        this.router.navigate(['games-list']);
      }, (error) => {});
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedListener.next(false);
    this.router.navigate(['login']);
  }
}
