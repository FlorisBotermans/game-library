import { Component, OnInit, Input } from '@angular/core';
import { DeveloperService } from '../developer.service';
import { Game } from 'src/app/models/game.model';
import { Developer } from 'src/app/models/developer.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developers-list',
  templateUrl: './developers-list.component.html',
  styleUrls: ['./developers-list.component.css']
})
export class DevelopersListComponent implements OnInit {
  @Input() game: any;
  gameId: string;
  developers: Developer[] = [];
  developerSub: Subscription;

  constructor(private developerService: DeveloperService, private route: ActivatedRoute) { 
    this.route.params.subscribe((params) => this.gameId = params.gameId);
  }

  ngOnInit() {
    this.developerService.getDevelopers(this.gameId);
    this.developerSub = this.developerService.getDevelopersUpdateListener()
      .subscribe((developerData: { developers: Developer[] }) => {
        this.developers = developerData.developers;
      });
  }

  deleteDeveloper(gameId: string, developerId: string) {
    this.developerService.deleteDeveloper(gameId, developerId);
  }
}
