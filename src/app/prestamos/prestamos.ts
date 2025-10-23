import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../prestamos/prestamo.service';
import { IPrestamo} from '../interfaces/prestamo.interfaces';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamos.html',
  styleUrls: ['./prestamos.css', '../panel-gestion.css']
})
export class Prestamos implements OnInit {
  prestamos: IPrestamo[] = [];
  nuevoPrestamo = {
    usuario: '',
    libro: '',
    fechaPrestamo: null,
    fechaDevolucion: null
  };

  constructor(private prestamoService: PrestamoService) {}
  
  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe({
      next: (data) => {
        this.prestamos = data;
        console.log('Prestamos cargados exitosamente:', this.prestamos);
      },
      error: (err) => console.error('Error al cargar Prestamos:', err)
    });
  }

  registrarPrestamo() {
    this.prestamoService.registrarPrestamo(this.nuevoPrestamo as IPrestamo).subscribe({
      next: (prestamoGuardado) => {
        this.prestamos.push(prestamoGuardado);
        this.nuevoPrestamo = { usuario: '', libro: '', fechaPrestamo: null, fechaDevolucion: null };
      },
      error: (err) => console.error('Error al registrar el prestamo', err)
    });
  }

  marcarDevuelto(prestamo: any) {
    // lógica de edición
  }

  eliminarPrestamo(prestamo: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${prestamo.titulo}"?`)) {
      this.prestamoService.eliminarPrestamo(prestamo._id).subscribe({
        next: () => {
          this.prestamos = this.prestamos.filter(l => l._id !== prestamo._id);
        },
        error: (err) => console.error('Error al eliminar el prestamo:', err)
      });
    }
  }
}
