export interface ErrorValidacionCampo {
  campo: string;
  mensaje: string;
}

export interface ResultadoValidacion {
  valido: boolean;
  errores: ErrorValidacionCampo[];
}
