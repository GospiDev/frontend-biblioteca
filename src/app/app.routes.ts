import { Routes } from '@angular/router';
import { Libros } from './libros/libros';
import { Usuarios } from './usuarios/usuarios';
import { Prestamos } from './prestamos/prestamos';
import { Login } from './login/login';


export const appRoutes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'libros', component: Libros },
  { path: 'usuarios', component: Usuarios },
  { path: 'prestamos', component: Prestamos },
  { path: '**', redirectTo: '/login' }
];