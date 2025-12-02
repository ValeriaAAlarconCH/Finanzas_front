import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Credito } from '../../../core/models';
import { Cuota } from '../../../core/models';
import { IndicadorFinanciero } from '../../../core/models';
import { SimulacionResponse } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  constructor(private api: ApiService) {}

  // CRUD básico - CORREGIDO según endpoints reales
  getCreditos(): Observable<Credito[]> {
    return this.api.get<Credito[]>('/creditos/listar');
  }

  getCredito(id: number): Observable<Credito> {
    return this.api.get<Credito>(`/creditos/listarid/${id}`);
  }

  crearCredito(credito: Credito): Observable<Credito> {
    return this.api.post<Credito>('/creditos/registrar', credito);
  }

  actualizarCredito(credito: Credito): Observable<Credito> {
    return this.api.put<Credito>('/creditos/actualizar', credito);
  }

  eliminarCredito(id: number): Observable<any> {
    return this.api.delete<any>(`/creditos/eliminar/${id}`);
  }

  // Simulaciones - CORREGIDO según endpoints reales
  simularCreditoCompleto(credito: Credito): Observable<SimulacionResponse> {
    return this.api.post<SimulacionResponse>('/simulaciones/simulacion-completa', credito);
  }

  generarCronograma(credito: Credito): Observable<Cuota[]> {
    return this.api.post<Cuota[]>('/simulaciones/generar-cronograma', credito);
  }

  calcularIndicadores(credito: Credito): Observable<IndicadorFinanciero> {
    return this.api.post<IndicadorFinanciero>('/simulaciones/calcular-indicadores', credito);
  }

  // Estado de cuenta - CORREGIDO
  getEstadoCuenta(creditoId: number, fechaCorte?: Date): Observable<any> {
    const params: Record<string, any> = {};
    if (fechaCorte) {
      params['fechaCorte'] = fechaCorte.toISOString().split('T')[0];
    }
    return this.api.get<any>(`/pagos/estado-cuenta/${creditoId}`, params);
  }

  // Métodos adicionales
  getCreditosPorCliente(clienteId: number): Observable<Credito[]> {
    return this.api.get<Credito[]>(`/creditos/cliente/${clienteId}`);
  }

  getCreditosPorEstado(estado: string): Observable<Credito[]> {
    return this.api.get<Credito[]>(`/creditos/estado/${estado}`);
  }
}
