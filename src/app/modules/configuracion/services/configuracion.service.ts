import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Configuracion } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  constructor(private api: ApiService) {}

  getConfiguraciones(): Observable<Configuracion[]> {
    return this.api.get<Configuracion[]>('/configuracion/listar');
  }

  getConfiguracionPorClave(clave: string): Observable<Configuracion> {
    return this.api.get<Configuracion>(`/configuracion/clave/${clave}`);
  }

  guardarConfiguracion(config: Configuracion): Observable<Configuracion> {
    return this.api.post<Configuracion>('/configuracion/guardar', config);
  }

  actualizarConfiguracion(config: Configuracion): Observable<Configuracion> {
    return this.api.put<Configuracion>('/configuracion/actualizar', config);
  }
}
