export interface IndicadorFinanciero {
  id_indicador?: number;
  fecha_calculo: string | Date;
  VAN: number;
  TIR: number;
  TCEA: number;
  TREA: number;
  duracion: number;
  duracion_modificada: number;
  convexidad: number;
  credito?: any;
  creditodto?: any;
}
