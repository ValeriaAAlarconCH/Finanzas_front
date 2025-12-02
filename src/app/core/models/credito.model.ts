import { Cliente } from './cliente.model';
import { UnidadInmobiliaria } from './unidad-inmobiliaria.model';
import { EntidadFinanciera } from './entidad-financiera.model';
import { Moneda } from './moneda.model';
import { TipoTasaInteres } from './tipo-tasa-interes.model';
import { Capitalizacion } from './capitalizacion.model';
import { PeriodoGracia } from './periodo-gracia.model';

export interface Credito {
  id_credito?: number;
  meses_gracia: number;
  monto_principal: number;
  tasa_anual: number;
  plazo_meses: number;
  fecha_desembolso: string | Date;
  numero_contrato: string;
  estado: string;

  cliente?: Cliente;
  unidad?: UnidadInmobiliaria;
  entidad?: EntidadFinanciera;
  moneda?: Moneda;
  tasa?: TipoTasaInteres;
  capitalizacion?: Capitalizacion;
  gracia?: PeriodoGracia;

  // Para compatibilidad con DTOs del backend
  clientedto?: Cliente;
  unidaddto?: UnidadInmobiliaria;
  entidaddto?: EntidadFinanciera;
  monedadto?: Moneda;
  tasadto?: TipoTasaInteres;
  capitalizaciondto?: Capitalizacion;
  graciadto?: PeriodoGracia;
}

export interface SimulacionCreditoRequest {
  montoPrincipal: number;
  tasaAnual: number;
  plazoMeses: number;
  mesesGracia: number;
  tipoGracia: 'total' | 'parcial';
  tipoTasa: 'nominal' | 'efectiva';
  idCapitalizacion: number;
  idMoneda: number;
  seguroDesgravamen?: number;
  seguroInmueble?: number;
  otrosCargos?: number;
  fechaPrimeraCuota?: string | Date;
  idCliente: number;
  idUnidad: number;
  idEntidad: number;
}
