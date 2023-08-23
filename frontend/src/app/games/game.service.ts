import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Game } from '../models/game.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: Game[];
  private game: Game;
  private gamesUpdated = new Subject<{ games: Game[] }>();
  private gameUpdated = new Subject<{ game: Game }>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getGamesUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGameByIdUpdateListener() {
    return this.gameUpdated.asObservable();
  }

  createGame(formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/games`, formValue)
      .subscribe((response) => {
        this.router.navigate(['games-list']);
      });
  }

  getGames() {
    this.http.get<any>(`${this.apiUrl}api/games`)
      .subscribe((response) => { 
        this.games = response;
        this.gamesUpdated.next({ games: [...this.games] });
      });      
  }

  getGameById(gameId: string) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId)
      .subscribe((response) => {
        this.game = response;
        this.gameUpdated.next({ game: { ...this.game } })
      });
  }

  updateGame(gameId: string, formValue: any) {
    this.http.put<any>(`${this.apiUrl}api/games/` + gameId, formValue)
      .subscribe((response) => {
        this.router.navigate(['games-list']);
      });
  }

  deleteGame(gameId: string) {
    this.http.delete(`${this.apiUrl}api/games/` + gameId)
      .subscribe((response) => {
        this.getGames();
      });
  }
}
