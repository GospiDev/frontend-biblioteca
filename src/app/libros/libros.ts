import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../libros/libro.service';
import { ILibro } from '../interfaces/libro.interfaces';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.html',
  styleUrl: './libros.css'
})

export class Libros {
  nuevoLibro = {
    titulo: '',
    autor: '',
    genero: '',
    ano: 0
  };

  libros: Array<{ titulo: string; autor: string; genero: string; ano: number }> = [];

  agregarLibro() {
    // lógica para agregar libro
    this.libros.push({ ...this.nuevoLibro });
    // luego limpiar el formulario:
    this.nuevoLibro = { titulo: '', autor: '', genero: '', ano: 0 };
  }

  editarLibro(libro: any) {
    // lógica de edición
  }

  eliminarLibro(libro: any) {
    // lógica de eliminar
  }
}
