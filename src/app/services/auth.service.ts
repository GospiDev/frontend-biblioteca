import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  rol: 'Admin' | 'Usuario';
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://backend-biblioteca-u4k0.onrender.com/api/auth';
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<'Admin' | 'Usuario' | null>(null);

  isLoggedIn$ = this.loggedIn.asObservable();
  role$ = this.userRole.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkTokenAndSetRole();
  }

  private checkTokenAndSetRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          this.loggedIn.next(true);
          this.userRole.next(decoded.rol);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(correo: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { correo, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          
          const decoded = jwtDecode<JwtPayload>(response.token);
          
          this.loggedIn.next(true);
          this.userRole.next(decoded.rol);
          
          this.router.navigate(['/libros']);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.userRole.next(null);
    this.router.navigate(['/login']);
  }
  
  getRole(): 'Admin' | 'Usuario' | null {
    return this.userRole.value;
  }
}