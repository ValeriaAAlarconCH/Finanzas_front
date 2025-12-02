import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Cliente } from '../../../core/models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-detail.html',
  styleUrl: './cliente-detail.css',
})
export class ClienteDetail implements OnInit {
  cliente?: Cliente;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.cargarCliente(id);
      } else {
        this.error = 'ID de cliente no válido';
      }
    });
  }

  cargarCliente(id: number): void {
    this.cargando = true;
    this.clienteService.getCliente(id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar cliente: ' + err.message;
        this.cargando = false;
      },
    });
  }

  volverAListado(): void {
    this.router.navigate(['/clientes']);
  }

  irAEditar(): void {
    if (this.cliente?.id_cliente) {
      this.router.navigate(['/clientes/editar', this.cliente.id_cliente]);
    }
  }

  calcularEdad(fechaNacimiento: string | Date): number {
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
