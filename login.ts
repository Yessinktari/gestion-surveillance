import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../Services/login-service';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  user: any;
  email = '';
  password = '';
  errorMessage = '';

  constructor(private LoginService: LoginService, private router: Router) {}

 onLogin() {
  this.LoginService.login(this.email, this.password).subscribe({
    next: (user) => {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      console.log('Connexion réussie :', user);
      this.router.navigate(['/Accueil']);
    }
  },
    error: (err) => {
      console.error('Erreur de connexion :', err);
      this.errorMessage = 'Identifiants incorrects';
    }
  });
}

}
