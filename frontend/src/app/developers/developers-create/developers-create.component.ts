import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeveloperService } from '../developer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developers-create',
  templateUrl: './developers-create.component.html',
  styleUrls: ['./developers-create.component.css']
})
export class DevelopersCreateComponent implements OnInit {
  createDeveloperForm: FormGroup;
  gameId: string;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.gameId = params.gameId);

    this.createDeveloperForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  createDeveloper(gameId: string) {
    this.developerService.createDeveloper(gameId, this.createDeveloperForm.value);
  }
}
