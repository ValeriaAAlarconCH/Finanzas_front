import { ProyectoInmobiliario } from './proyecto-inmobiliario.model';
import { Moneda } from './moneda.model';

export interface UnidadInmobiliaria {
  id_unidad?: number;
  codigo: string;
  descripcion: string;
  area: number;
  precio_venta: number;
  piso?: number;
  numero?: string;
  estado: string; // DISPONIBLE, RESERVADO, VENDIDO, etc.
  proyecto?: ProyectoInmobiliario;
  moneda?: Moneda;
}
