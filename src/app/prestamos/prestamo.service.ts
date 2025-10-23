import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrestamo } from '../interfaces/prestamo.interfaces'; // Asegúrate que tu interfaz coincida

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'https://backend-biblioteca-u4k0.onrender.com/api/prestamo';

  constructor(private http: HttpClient) { }

  getPrestamos(): Observable<IPrestamo[]> {
    return this.http.get<IPrestamo[]>(this.apiUrl);
  }

  registrarPrestamo(prestamo: IPrestamo): Observable<IPrestamo> {
    return this.http.post<IPrestamo>(this.apiUrl, prestamo);
  }

  marcarDevuelto(id: string, prestamo: IPrestamo): Observable<IPrestamo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IPrestamo>(url, prestamo);
  }

  eliminarPrestamo(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}