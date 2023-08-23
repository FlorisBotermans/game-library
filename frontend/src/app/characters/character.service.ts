import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Character } from '../models/character.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters: Character[];
  private character: Character;
  private charactersUpdated = new Subject<{ characters: Character[] }>();
  private characterUpdated = new Subject<{ character: Character }>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getCharactersUpdateListener() {
    return this.charactersUpdated.asObservable();
  }

  getCharacterByIdUpdateListener() {
    return this.characterUpdated.asObservable();
  }

  createCharacter(gameId: string, formValue: any) {
    this.http.post<any>(`${this.apiUrl}api/games/` + gameId + '/characters', formValue)
      .subscribe((response) => {
        this.router.navigate(['details/' + gameId]);
      });
  }

  getCharacters(gameId: string) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId + '/characters')
      .subscribe((response) => { 
        this.characters = response;
        this.charactersUpdated.next({ characters: [...this.characters] });
      });  
  }

  getCharacterById(gameId: string, characterId: string) {
    this.http.get<any>(`${this.apiUrl}api/games/` + gameId + '/characters/' + characterId)
      .subscribe((response) => {
        this.character = response;
        this.characterUpdated.next({ character: { ...this.character } })
      });
  }

  updateCharacter(gameId: string, characterId: string, formValue: any) {
    this.http.put<any>(`${this.apiUrl}api/games/` + gameId + '/characters/' + characterId, formValue)
      .subscribe((response) => {
        this.router.navigate(['details/' + gameId]);
      });
  }

  deleteCharacter(gameId: string, characterId: string) {
    this.http.delete(`${this.apiUrl}api/games/` + gameId + '/characters/' + characterId)
      .subscribe((response) => {
        this.getCharacters(gameId);
      });
  }
}
