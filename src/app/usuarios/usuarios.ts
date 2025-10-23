import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css', '../panel-gestion.css']
})
export class Usuarios {
  nuevoUsuario = {
    nombre: '',
    correo: '',
    rut: '',
  };

  usuarios: Array<{ nombre: string; correo: string; rut: string }> = [];

  registrarUsuario() {
    // lógica para agregar libro
    this.usuarios.push({ ...this.nuevoUsuario });
    // luego limpiar el formulario:
    this.nuevoUsuario = { nombre: '', correo: '', rut: '' };
  }

  editarUsuario(usuario: any) {
    // lógica de edición
  }

  eliminarUsuario(usuario: any) {
    // lógica de eliminar
  }
}
