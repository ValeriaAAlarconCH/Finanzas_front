export interface Capitalizacion {
  id_capitalizacion?: number;
  nombre: string;           // 'Mensual', 'Trimestral', etc.
  periodos_por_ano: number; // 12, 4, etc.
}
