export interface Reporte {
  id_reporte?: number;
  nombre: string;
  descripcion?: string;
  tipo: string;         // 'PDF', 'EXCEL', etc.
  fecha_generacion?: string | Date;
  parametros?: Record<string, any>;
}
