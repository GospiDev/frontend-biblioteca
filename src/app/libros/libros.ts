import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../libros/libro.service';
import { ILibro } from '../interfaces/libro.interfaces';

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
  
  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
        console.log('Libros cargados exitosamente:', this.libros);
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  // 4. Lógica para agregar un libro (ahora llama al servicio)
  agregarLibro(): void {
    this.libroService.agregarLibro(this.nuevoLibro as ILibro).subscribe({
      next: (libroGuardado) => {
        // Agregamos el libro que nos devuelve el backend (ya tiene _id)
        this.libros.push(libroGuardado);
        // Limpiamos el formulario
        this.nuevoLibro = { titulo: '', autor: '', genero: '', ano: null };
      },
      error: (err) => console.error('Error al agregar el libro:', err)
    });
  }

  // Lógica para editar (la veremos en un paso extra)
  editarLibro(libro: ILibro): void {
    // Aquí implementaremos la lógica para abrir un modal o poner los datos en el formulario
    console.log('Editando:', libro);
  }

// 5. Lógica para eliminar un libro (ahora llama al servicio)
  eliminarLibro(libro: ILibro): void {
    // Pedimos confirmación antes de borrar
    if (confirm(`¿Estás seguro de que deseas eliminar "${libro.titulo}"?`)) {
      // Usamos el _id del libro para decirle al backend cuál borrar
      this.libroService.eliminarLibro(libro._id).subscribe({
        next: () => {
          // Si se elimina en el backend, lo quitamos de nuestro array local
          this.libros = this.libros.filter(l => l._id !== libro._id);
        },
        error: (err) => console.error('Error al eliminar el libro:', err)
      });
    }
  }
}