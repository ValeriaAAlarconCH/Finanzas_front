import { Credito } from './credito.model';

export interface Cuota {
  id_cuota?: number;
  numero_cuota: number;
  fecha_vencimiento: string | Date;
  dias_periodo: number;
  saldo_inicial: number;
  capital_programado: number;
  interes_programado: number;
  otros_cargos: number;
  total_cuota: number;
  saldo_final: number;
  estado: string;
  credito?: Credito;
  creditodto?: Credito;
}
