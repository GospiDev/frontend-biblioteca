export interface IPrestamo {
  _id: string;
  usuario: string;
  libro: string;
  fechaPrestamo: number | null;
  fechaDevolucion: number | null;
}