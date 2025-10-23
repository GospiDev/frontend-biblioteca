import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuarios/usuario.service';
import { IUsuario} from '../interfaces/usuario.interfaces';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css', '../panel-gestion.css']
})
export class Usuarios implements OnInit {
  usuarios: IUsuario[] = [];
  nuevoUsuario = {
    nombre: '',
    correo: '',
    rut: '',
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  
  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados exitosamente:', this.usuarios);
      },
      error: (err) => console.error('Error al cargar Usuarios:', err)
    });
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.nuevoUsuario as IUsuario).subscribe({
      next: (usuarioGuardado) => {
        this.usuarios.push(usuarioGuardado);
        this.nuevoUsuario = { nombre: '', correo: '', rut: '' };
      },
      error: (err) => console.error('Error al registrar el usuario', err)
    });
  }


  editarUsuario(usuario: any) {
    // lógica de edición
  }

  eliminarUsuario(usuario: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${usuario.titulo}"?`)) {
      this.usuarioService.eliminarUsuario(usuario._id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(l => l._id !== usuario._id);
        },
        error: (err) => console.error('Error al eliminar el usuario:', err)
      });
    }
  }
}
