import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  clave = '';
  mensaje = '';

  constructor(private authService: AuthService) {}

  login() {
    if (this.usuario === 'admin' && this.clave === '1234') {
      this.authService.login();
    } 
    else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}
