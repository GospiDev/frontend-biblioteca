import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interfaces';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'https://backend-biblioteca-u4k0.onrender.com/api/usuario';
    
    constructor(private http: HttpClient) { }
    
    getUsuarios(searchTerm: string = ''): Observable<IUsuario[]> {
        let params = new HttpParams();
        if (searchTerm) {
            params = params.set('search', searchTerm);
        }
        return this.http.get<IUsuario[]>(this.apiUrl, { params: params });
    }

    registrarUsuario(usuario: IUsuario): Observable<IUsuario> {
        return this.http.post<IUsuario>(this.apiUrl, usuario);
    }

    updateUsuario(id: string, cambios: Partial<IUsuario>): Observable<IUsuario> {
        return this.http.put<IUsuario>(`${this.apiUrl}/${id}`, cambios);
    }

    editarUsuario(id: string, usuario: IUsuario): Observable<IUsuario> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<IUsuario>(url, usuario);
    }

    eliminarUsuario(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(url);
    }

    checkConnection(): Observable<any> {
        return this.http.get(`${this.apiUrl}/health`);
    }
}
