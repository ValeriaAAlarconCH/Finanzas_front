export interface Notificacion {
  idNotificacion?: number;
  tipo: string; // 'email', 'sistema', 'recordatorio'
  destinatario: string;
  asunto: string;
  mensaje: string;
  fechaEnvio: string | Date;
  enviada: boolean;
  leida: boolean;
  referenciaId?: number;
  prioridad: string; // 'alta', 'media', 'baja'
}
