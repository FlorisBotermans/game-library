import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../character.service';
import { Game } from 'src/app/models/game.model';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  @Input() game: any;
  gameId: string;
  characters: Character[] = [];
  characterSub: Subscription;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { 
    this.route.params.subscribe((params) => this.gameId = params.gameId);
  }

  ngOnInit() {
    this.characterService.getCharacters(this.gameId);
    this.characterSub = this.characterService.getCharactersUpdateListener()
      .subscribe((characterData: { characters: Character[] }) => {
        this.characters = characterData.characters;
      });
  }

  deleteCharacter(gameId: string, characterId: string) {
    this.characterService.deleteCharacter(gameId, characterId);
  }
}
