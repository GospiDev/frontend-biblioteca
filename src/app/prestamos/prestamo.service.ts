import { Injectable } from '@angular/core';
import { IPrestamo } from '../interfaces/prestamo.interfaces';

@Injectable({
    providedIn: 'root'
})
export class PrestamoService {
    private prestamos: IPrestamo[] = [];

    registrarPrestamo(): IPrestamo[] {
        return this.prestamos;
    }

    marcarDevuelto(prestamo: IPrestamo): void {
        this.prestamos.push(prestamo);
    }

    eliminarPrestamo(index: number): void {
        this.prestamos.splice(index, 1);
    }

  // etc…
}
