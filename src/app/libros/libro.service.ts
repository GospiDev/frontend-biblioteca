import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILibro } from '../interfaces/libro.interfaces'; // Asegúrate que tu interfaz coincida

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  // ‼️ MUY IMPORTANTE: Reemplaza esta URL con la URL de tu backend en Render
  private apiUrl = 'https://backend-biblioteca-u4k0.onrender.com/api/libros';

  // Inyectamos el HttpClient de Angular para poder hacer peticiones a la API
  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los libros desde el backend.
   * Devuelve un Observable que emite un array de libros.
   */
  getLibros(): Observable<ILibro[]> {
    return this.http.get<ILibro[]>(this.apiUrl);
  }

  /**
   * Envía un nuevo libro al backend para ser creado.
   * Devuelve un Observable que emite el libro recién guardado (con su _id).
   */
  agregarLibro(libro: ILibro): Observable<ILibro> {
    return this.http.post<ILibro>(this.apiUrl, libro);
  }

  /**
   * Envía los datos de un libro al backend para ser actualizado.
   * Necesita el _id del libro y los nuevos datos.
   */
  actualizarLibro(id: string, libro: ILibro): Observable<ILibro> {
    const url = `${this.apiUrl}/${id}`; // ej: /api/libros/60d21b4667d0d8992e610c85
    return this.http.put<ILibro>(url, libro);
  }

  /**
   * Pide al backend que elimine un libro por su _id.
   */
  eliminarLibro(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}