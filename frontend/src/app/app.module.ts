import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import {
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MatDividerModule,
  MatChipsModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatStepperModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { LoginComponent } from './auth/login/login.component';
import { GamesCreateComponent } from './games/games-create/games-create.component';
import { GamesUpdateComponent } from './games/games-update/games-update.component';
import { GamesDetailComponent } from './games/games-detail/games-detail.component';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';
import { CharactersCreateComponent } from './characters/characters-create/characters-create.component';
import { CharactersUpdateComponent } from './characters/characters-update/characters-update.component';
import { HeaderComponent } from './header/header.component';
import { DevelopersListComponent } from './developers/developers-list/developers-list.component';
import { DevelopersCreateComponent } from './developers/developers-create/developers-create.component';
import { DevelopersUpdateComponent } from './developers/developers-update/developers-update.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpTokenInterceptor } from './auth/http-token-interceptor';
import { HttpErrorInterceptor } from './http-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    LoginComponent,
    GamesCreateComponent,
    GamesUpdateComponent,
    GamesDetailComponent,
    CharactersListComponent,
    CharactersCreateComponent,
    CharactersUpdateComponent,
    HeaderComponent,
    DevelopersListComponent,
    DevelopersCreateComponent,
    DevelopersUpdateComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
