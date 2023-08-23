import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../developer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Developer } from 'src/app/models/developer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-developers-update',
  templateUrl: './developers-update.component.html',
  styleUrls: ['./developers-update.component.css']
})
export class DevelopersUpdateComponent implements OnInit {
  developer: Developer;
  developerSub: Subscription;
  updateDeveloperForm: FormGroup;
  gameId: string;
  developerId: string;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.gameId = params.gameId);
    this.route.params.subscribe(params => this.developerId = params.developerId);

    this.updateDeveloperForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.developerService.getDeveloperById(this.gameId, this.developerId);
    this.developerSub = this.developerService.getDeveloperByIdUpdateListener()
      .subscribe((developerData: { developer: Developer }) => {
        this.developer = developerData.developer;
      });
  }

  updateDeveloper(gameId: string, developerId: string) {
    this.developerService.updateDeveloper(gameId, developerId, this.updateDeveloperForm.value);
  }
}
