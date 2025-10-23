import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject mantiene el estado actual y notifica a los suscriptores cuando cambia.
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  
  // Exponemos el estado como un Observable para que los componentes puedan suscribirse.
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  /**
   * Revisa si el token/indicador de sesión existe en localStorage.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('logged');
  }

  /**
   * Lógica para iniciar sesión.
   */
  login() {
    // Aquí iría la lógica para validar contra un backend real.
    // Por ahora, simulamos el éxito.
    localStorage.setItem('logged', 'true');
    this.loggedIn.next(true); // Notifica a toda la app que el estado cambió a "conectado".
    this.router.navigate(['/libros']); // Navega a la página principal.
  }

  /**
   * Lógica para cerrar sesión.
   */
  logout() {
    localStorage.removeItem('logged');
    this.loggedIn.next(false); // Notifica a toda la app que el estado cambió a "desconectado".
    this.router.navigate(['/login']); // Navega a la página de login.
  }
}