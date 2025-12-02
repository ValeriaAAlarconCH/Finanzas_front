import { Credito } from './credito.model';
import { Moneda } from './moneda.model';
import { Cliente } from './cliente.model';

export interface Pago {
  id_pago?: number;
  fecha_pago: string | Date;
  monto: number;
  metodo_pago: string;
  referencia: string;

  credito?: Credito;
  moneda?: Moneda;
  cliente?: Cliente;

  // Para compatibilidad con DTOs
  creditodto?: Credito;
  monedadto?: Moneda;
  clientedto?: Cliente;
}
