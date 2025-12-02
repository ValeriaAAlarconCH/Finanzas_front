import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Reporte } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  constructor(private api: ApiService) {}

  generarReporteEstadoCuenta(creditoId: number): Observable<Blob> {
    return this.api.download(`/reportes/estado-cuenta/${creditoId}`);
  }

  generarReporteGeneral(params?: Record<string, any>): Observable<Blob> {
    // Ejemplo genérico: /reportes/general?...
    return this.api.get<Blob>('/reportes/general', params);
  }

  // Si el backend devuelve metadatos de reportes:
  listarReportes(): Observable<Reporte[]> {
    return this.api.get<Reporte[]>('/reportes/listar');
  }
}
