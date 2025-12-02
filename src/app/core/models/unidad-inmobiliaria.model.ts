import { ProyectoInmobiliario } from './proyecto-inmobiliario.model';
import { Moneda } from './moneda.model';

export interface UnidadInmobiliaria {
  id_unidad?: number;
  codigo_unidad: string;
  tipo: string;
  area_m2: number;
  num_dormitorios: number;
  num_banos: number;
  piso: string;
  precio_lista: number;
  precio_venta: number;
  estado: string; // 'disponible', 'reservado', 'vendido'
  descripcion?: string;

  proyecto?: ProyectoInmobiliario;
  moneda?: Moneda;
  proyectodto?: ProyectoInmobiliario; // Para compatibilidad
  monedadto?: Moneda; // Para compatibilidad
}
