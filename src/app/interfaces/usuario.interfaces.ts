export interface IUsuario {
  _id: string;
  nombre: string;
  correo: string;
  rut: string;
  situacion: 'Vigente' | 'Atrasado' | 'Bloqueado' | 'Préstamo Activo';
}