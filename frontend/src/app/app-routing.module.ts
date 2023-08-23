import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LoginComponent } from './auth/login/login.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import { GamesUpdateComponent } from './games/games-update/games-update.component';
import { GamesDetailComponent } from './games/games-detail/games-detail.component';
import { CharactersCreateComponent } from './characters/characters-create/characters-create.component';
import { CharactersUpdateComponent } from './characters/characters-update/characters-update.component';
import { DevelopersCreateComponent } from './developers/developers-create/developers-create.component';
import { DevelopersUpdateComponent } from './developers/developers-update/developers-update.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'games-create', component: GamesCreateComponent, canActivate: [AuthGuard] },
  { path: 'games-list', component: GamesListComponent, canActivate: [AuthGuard] },
  { path: 'games-update/:gameId', component: GamesUpdateComponent, canActivate: [AuthGuard] },
  { path: 'details/:gameId', component: GamesDetailComponent, canActivate: [AuthGuard] },
  { path: 'details/:gameId/characters-create', component: CharactersCreateComponent, canActivate: [AuthGuard] },
  { path: 'details/:gameId/characters-update/:characterId', component: CharactersUpdateComponent, canActivate: [AuthGuard] },
  { path: 'details/:gameId/developers-create', component: DevelopersCreateComponent, canActivate: [AuthGuard] },
  { path: 'details/:gameId/developers-update/:developerId', component: DevelopersUpdateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
