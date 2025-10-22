import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/usuario.interfaces';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private usuarios: IUsuario[] = [];

    registrarUsuario(): IUsuario[] {
        return this.usuarios;
    }

    editarUsuario(usuario: IUsuario): void {
        this.usuarios.push(usuario);
    }

    eliminarUsuario(index: number): void {
        this.usuarios.splice(index, 1);
    }

  // etc…
}
