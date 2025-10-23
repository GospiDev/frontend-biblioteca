import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos.html',
  styleUrls: ['./prestamos.css', '../panel-gestion.css']
})
export class Prestamos {
  nuevoPrestamo = {
    usuario: '',
    libro: '',
    fechaPrestamo: 0,
    fechaDevolucion: 0
  };

  prestamos: Array<{ usuario: string; libro: string; fechaPrestamo: number; fechaDevolucion: number }> = [];

  registrarPrestamo() {
    // lógica para agregar libro
    this.prestamos.push({ ...this.nuevoPrestamo });
    // luego limpiar el formulario:
    this.nuevoPrestamo = { usuario: '', libro: '', fechaPrestamo: 0, fechaDevolucion: 0 };
  }

  marcarDevuelto(prestamo: any) {
    // lógica de edición
  }

  eliminarPrestamo(prestamo: any) {
    // lógica de eliminar
  }
}
