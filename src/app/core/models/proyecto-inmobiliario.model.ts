export interface ProyectoInmobiliario {
  id_proyecto?: number;
  nombre_proyecto: string;
  direccion: string;
  descripcion: string;
  desarrollador: string;
  fecha_inicio: string | Date;
  fecha_entrega_estimada: string | Date;
}
