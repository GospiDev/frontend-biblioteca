export interface IUsuario {
  _id: string;
  nombre: string;
  correo: string;
  rut: string;
  situacion: 'Vigente' | 'Atrasado' | 'Bloqueado' | 'Prestamo Activo';
  rol: 'Admin' | 'Usuario';
}

export interface ICrearUsuario {
  nombre: string;
  correo: string;
  rut: string;
  rol: 'Admin' | 'Usuario';
  password: string;
}