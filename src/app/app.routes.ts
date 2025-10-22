import { Routes } from '@angular/router';
import { Libros } from './libros/libros';
import { Usuarios } from './usuarios/usuarios';
import { Prestamos } from './prestamos/prestamos';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  { path: 'libros', component: Libros },
  { path: 'usuarios', component: Usuarios },
  { path: 'prestamos', component: Prestamos },
  { path: '**', redirectTo: 'libros' }
];