import { Injectable } from '@angular/core';
import { ILibro } from '../interfaces/libro.interfaces';

@Injectable({
    providedIn: 'root'
})
export class LibroService {
    private libros: ILibro[] = [];

    getLibros(): ILibro[] {
        return this.libros;
    }

    agregarLibro(libro: ILibro): void {
        this.libros.push(libro);
    }

    eliminarLibro(index: number): void {
        this.libros.splice(index, 1);
    }

  // etc…
}
