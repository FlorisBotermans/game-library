import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters-update',
  templateUrl: './characters-update.component.html',
  styleUrls: ['./characters-update.component.css']
})
export class CharactersUpdateComponent implements OnInit {
  character: Character;
  characterSub: Subscription;
  updateCharacterForm: FormGroup;
  gameId: string;
  characterId: string;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.gameId = params.gameId);
    this.route.params.subscribe(params => this.characterId = params.characterId);

    this.updateCharacterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.characterService.getCharacterById(this.gameId, this.characterId);
    this.characterSub = this.characterService.getCharacterByIdUpdateListener()
      .subscribe((characterData: { character: Character }) => {
        this.character = characterData.character;
      });
  }

  updateCharacter(gameId: string, characterId: string) {
    this.characterService.updateCharacter(gameId, characterId, this.updateCharacterForm.value);
  }
}
