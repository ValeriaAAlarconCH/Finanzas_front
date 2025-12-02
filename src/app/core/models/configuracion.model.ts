import { Cliente } from './cliente.model';
import { Moneda } from './moneda.model';
import { TipoTasaInteres } from './tipo-tasa-interes.model';
import { Capitalizacion } from './capitalizacion.model';

export interface Configuracion {
  id_config?: number;
  convencion_dias: number;
  periodicidad: string;

  cliente?: Cliente;
  moneda?: Moneda;
  tasa?: TipoTasaInteres;
  capitalizacion?: Capitalizacion;

  // Para compatibilidad
  clientedto?: Cliente;
  monedadto?: Moneda;
  tasadto?: TipoTasaInteres;
  capitalizaciondto?: Capitalizacion;
}
