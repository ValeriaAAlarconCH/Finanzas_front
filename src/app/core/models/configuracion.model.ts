export interface Configuracion {
  id_configuracion?: number;
  clave: string;       // Ej: 'TASA_INTERES_DEFAULT'
  valor: string;       // Se puede parsear a número/boolean si es necesario
  descripcion?: string;
  categoria?: string;  // 'FINANCIERA', 'SISTEMA', etc.
}
