import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Credito, SimulacionCreditoRequest } from '../../../core/models';
import { SimulacionResponse } from '../../../core/models';
import { Cuota } from '../../../core/models';
import { IndicadorFinanciero } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {
  constructor(private api: ApiService) {}

  simularCreditoCompleto(request: SimulacionCreditoRequest): Observable<SimulacionResponse> {
    return this.api.post<SimulacionResponse>('/simulaciones/simulacion-completa', request);
  }

  generarCronograma(credito: Credito | SimulacionCreditoRequest): Observable<Cuota[]> {
    return this.api.post<Cuota[]>('/simulaciones/generar-cronograma', credito);
  }

  calcularIndicadores(credito: Credito | SimulacionCreditoRequest): Observable<IndicadorFinanciero> {
    return this.api.post<IndicadorFinanciero>('/simulaciones/calcular-indicadores', credito);
  }
}
