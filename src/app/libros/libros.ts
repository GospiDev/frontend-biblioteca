import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../libros/libro.service';
import { ILibro } from '../interfaces/libro.interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.html',
  styleUrls: ['./libros.css', '../panel-gestion.css']
})
export class Libros implements OnInit { 
  libros: ILibro[] = [];
  nuevoLibro: Omit<ILibro, '_id'> = {
    titulo: '',
    autor: '',
    genero: '',
    ano: null
  };
  terminoBusqueda: string = '';
  esAdmin: boolean = false;
  
  constructor(private libroService: LibroService, private authService: AuthService) {}

  ngOnInit(): void {
    this.esAdmin = (this.authService.getRole() === 'Admin');
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getLibros(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.libros = data;
        console.log('Libros cargados exitosamente:', this.libros);
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  agregarLibro(): void {
    this.libroService.agregarLibro(this.nuevoLibro as ILibro).subscribe({
      next: (libroGuardado) => {
        this.cargarLibros();
        this.nuevoLibro = { titulo: '', autor: '', genero: '', ano: null };
      },
      error: (err) => console.error('Error al agregar el libro:', err)
    });
  }

  editarLibro(libro: ILibro): void {
    console.log('Editando:', libro);
  }

  eliminarLibro(libro: ILibro): void {
    if (confirm(`¿Estás seguro de que deseas eliminar "${libro.titulo}"?`)) {
      this.libroService.eliminarLibro(libro._id).subscribe({
        next: () => {
          this.libros = this.libros.filter(l => l._id !== libro._id);
        },
        error: (err) => console.error('Error al eliminar el libro:', err)
      });
    }
  }
}