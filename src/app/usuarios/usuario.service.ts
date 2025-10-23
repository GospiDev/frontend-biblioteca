import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interfaces';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'https://backend-biblioteca-u4k0.onrender.com/api/usuario';
    
    constructor(private http: HttpClient) { }
    
    getUsuarios(): Observable<IUsuario[]> {
        return this.http.get<IUsuario[]>(this.apiUrl);
    }

    registrarUsuario(usuario: IUsuario): Observable<IUsuario> {
        return this.http.post<IUsuario>(this.apiUrl, usuario);
    }

    editarUsuario(id: string, usuario: IUsuario): Observable<IUsuario> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<IUsuario>(url, usuario);
    }

    eliminarUsuario(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
    }
}
