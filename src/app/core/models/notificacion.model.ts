export interface Notificacion {
  id_notificacion?: number;
  tipo: string;        // 'INFO', 'WARN', 'ERROR', etc.
  mensaje: string;
  fecha: string | Date;
  leida?: boolean;
  destino?: string;    // 'CLIENTE', 'ASESOR', etc.
}
