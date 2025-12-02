export interface Cliente {
  id_cliente?: number;
  dni: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string | Date;
  sexo: string;
  direccion: string;
  telefono: number;
  email: string;
  ocupacion: string;
  empleador: string;
  ingreso_mensual: number;
  estado_civil: string;
  num_dependientes: number;
  observaciones: string;
  user?: any; // Para compatibilidad con backend
}

export interface ClienteDto extends Cliente {}
