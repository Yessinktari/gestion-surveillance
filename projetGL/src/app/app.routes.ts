import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Accueil } from './accueil/accueil';
import { Profile } from './profile/profile';

export const routes: Routes = 
[
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'Accueil', component: Accueil},
  {path: 'Profile', component: Profile}
];
