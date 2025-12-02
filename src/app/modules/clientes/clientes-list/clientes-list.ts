import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../../../core/models/cliente.model';
import {ClienteService} from '../services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})
export class ClientesList implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtro: string = '';
  cargando: boolean = true;
  error: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = data;
        this.cargando = false;
      },
      error: (error) => {
        this.error = 'Error al cargar clientes: ' + error.message;
        this.cargando = false;
        console.error('Error:', error);
      },
    });
  }

  aplicarFiltro(): void {
    if (!this.filtro) {
      this.clientesFiltrados = this.clientes;
      return;
    }

    const filtroLower = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(
      (cliente) =>
        cliente.nombres.toLowerCase().includes(filtroLower) ||
        cliente.apellidos.toLowerCase().includes(filtroLower) ||
        cliente.dni.toString().includes(filtroLower) ||
        cliente.email.toLowerCase().includes(filtroLower)
    );
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.cargarClientes(); // Recargar lista
        },
        error: (error) => {
          alert('Error al eliminar cliente: ' + error.message);
        },
      });
    }
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }
}
