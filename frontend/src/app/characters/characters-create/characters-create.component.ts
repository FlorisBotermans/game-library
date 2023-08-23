import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-create',
  templateUrl: './characters-create.component.html',
  styleUrls: ['./characters-create.component.css']
})
export class CharactersCreateComponent implements OnInit {
  createCharacterForm: FormGroup;
  gameId: string;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.gameId = params.gameId);

    this.createCharacterForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  createCharacter(gameId: string) {
    this.characterService.createCharacter(gameId, this.createCharacterForm.value);
  }
}
