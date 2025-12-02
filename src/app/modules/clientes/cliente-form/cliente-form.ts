import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from '../../../core/models/cliente.model';
import {ClienteService} from '../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm implements OnInit {
  clienteForm: FormGroup;
  modoEdicion: boolean = false;
  clienteId?: number;
  cargando: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.crearFormulario();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.modoEdicion = true;
        this.clienteId = +params['id'];
        this.cargarCliente(this.clienteId);
      }
    });
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      ocupacion: ['', Validators.required],
      empleador: [''],
      ingreso_mensual: ['', [Validators.required, Validators.min(0)]],
      estado_civil: ['', Validators.required],
      num_dependientes: [0, [Validators.required, Validators.min(0)]],
      observaciones: [''],
    });
  }

  cargarCliente(id: number): void {
    this.cargando = true;
    this.clienteService.getCliente(id).subscribe({
      next: (cliente) => {
        const fechaNac = new Date(cliente.fecha_nacimiento);
        const fechaFormateada = fechaNac.toISOString().split('T')[0];

        this.clienteForm.patchValue({
          ...cliente,
          fecha_nacimiento: fechaFormateada,
        });
        this.cargando = false;
      },
      error: (error) => {
        this.error = 'Error al cargar cliente: ' + error.message;
        this.cargando = false;
      },
    });
  }

  guardarCliente(): void {
    if (this.clienteForm.invalid) {
      this.marcarCamposInvalidos();
      return;
    }

    this.cargando = true;
    const clienteData = this.clienteForm.value;

    if (this.modoEdicion && this.clienteId) {
      this.clienteService
        .actualizarCliente({
          id_cliente: this.clienteId,
          ...clienteData,
        } as Cliente)
        .subscribe({
          next: () => {
            alert('Cliente actualizado correctamente');
            this.router.navigate(['/clientes']);
          },
          error: (error) => {
            this.error = 'Error al actualizar cliente: ' + error.message;
            this.cargando = false;
          },
        });
    } else {
      this.clienteService.crearCliente(clienteData as Cliente).subscribe({
        next: () => {
          alert('Cliente creado correctamente');
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          this.error = 'Error al crear cliente: ' + error.message;
          this.cargando = false;
        },
      });
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.clienteForm.controls).forEach((key) => {
      const control = this.clienteForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return control ? control.invalid && control.touched : false;
  }

  cancelar(): void {
    if (confirm('¿Desea cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/clientes']);
    }
  }
}
