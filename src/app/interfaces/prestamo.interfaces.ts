export interface IPrestamo {
  usuario: string;
  libro: string;
  fechaPrestamo: number | null;
  fechaDevolucion: number | null;
}