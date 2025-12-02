import { Credito } from './credito.model';

export interface Pago {
  id_pago?: number;
  fecha_pago: string | Date;
  monto: number;
  metodo_pago?: string;  // EFECTIVO, TRANSFERENCIA, etc.
  referencia?: string;
  estado?: string;
  credito?: Credito;
  creditodto?: Credito;
}
