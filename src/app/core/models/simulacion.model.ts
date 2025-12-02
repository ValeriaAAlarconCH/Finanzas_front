import { Credito } from './credito.model';
import { Cuota } from './cuota.model';
import { IndicadorFinanciero } from './indicador-financiero.model';

export interface SimulacionResumen {
  totalPagar: number;
  totalIntereses: number;
  totalCargos: number;
  cuotaPromedio: number;
  van: number;
  tir: number;
  tcea: number;
  trea: number;
}

export interface SimulacionResponse {
  credito: Credito;
  cronograma: Cuota[];
  indicadores: IndicadorFinanciero;
  resumen: SimulacionResumen;
  mensaje: string;
  exito: boolean;
}

export interface SimulacionCompletaResponse {
  credito: Credito;
  cronograma: Cuota[];
  indicadores: IndicadorFinanciero;
  resumen: SimulacionResumen;
  mensaje: string;
  exito: boolean;
}
