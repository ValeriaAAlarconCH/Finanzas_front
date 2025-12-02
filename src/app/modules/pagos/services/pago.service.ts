import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Pago } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(private api: ApiService) {}

  getPagosPorCredito(creditoId: number): Observable<Pago[]> {
    return this.api.get<Pago[]>(`/pagos/credito/${creditoId}`);
  }

  registrarPago(pago: Pago): Observable<Pago> {
    return this.api.post<Pago>('/pagos/registrar', pago);
  }

  eliminarPago(id: number): Observable<any> {
    return this.api.delete<any>(`/pagos/eliminar/${id}`);
  }
}
