import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from '../../../core/services/api.service';
import {Cliente} from '../../../core/models';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private api: ApiService) {}

  // CORREGIDO: Usar endpoints exactos de tu backend
  getClientes(): Observable<Cliente[]> {
    return this.api.get<Cliente[]>('/clientes/listar');
  }

  getCliente(id: number): Observable<Cliente> {
    return this.api.get<Cliente>(`/clientes/listarid/${id}`);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.api.post<Cliente>('/clientes/registrar', cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.api.put<Cliente>('/clientes/actualizar', cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.api.delete<any>(`/clientes/eliminar/${id}`);
  }

  // Metodo adicional que necesitarás
  buscarPorDni(dni: number): Observable<Cliente> {
    return this.api.get<Cliente>(`/clientes/buscar/dni/${dni}`);
  }
}
