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

  // Simulaciones
  simularCreditoCompleto(credito: Credito): Observable<SimulacionResponse> {
    return this.api.post<SimulacionResponse>('/simulaciones/simulacion-completa', credito);
  }

  generarCronograma(credito: Credito): Observable<Cuota[]> {
    return this.api.post<Cuota[]>('/simulaciones/generar-cronograma', credito);
  }

  // Métodos para obtener datos relacionados
  getMonedas(): Observable<any[]> {
    return this.api.get<any[]>('/monedas/listar');
  }

  getTiposTasa(): Observable<any[]> {
    return this.api.get<any[]>('/tipostasainteres/listar');
  }

  getCapitalizaciones(): Observable<any[]> {
    return this.api.get<any[]>('/capitalizaciones/listar');
  }

  getPeriodosGracia(): Observable<any[]> {
    return this.api.get<any[]>('/periodosgracia/listar');
  }

  getEntidadesFinancieras(): Observable<any[]> {
    return this.api.get<any[]>('/entidadesfinancieras/listar');
  }
}
