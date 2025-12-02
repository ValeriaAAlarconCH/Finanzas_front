import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CreditoService } from '../services/credito.service';
import { Credito } from '../../../core/models/credito.model';
import { Cliente } from '../../../core/models/cliente.model';
import { SimulacionResponse } from '../../../core/models/simulacion.model';
import {ClienteService} from '../../clientes/services/cliente.service';

@Component({
  selector: 'app-simulador-credito',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './simulador-credito.html',
  styleUrl: './simulador-credito.css',
})
export class SimuladorCredito implements OnInit {
  simulacionForm: FormGroup;
  pasoActual: number = 1;
  totalPasos: number = 4;

  // Datos para selects
  clientes: Cliente[] = [];
  monedas: any[] = [];
  tiposTasa: any[] = [];
  capitalizaciones: any[] = [];
  periodosGracia: any[] = [];
  entidades: any[] = [];

  // Resultados
  resultadoSimulacion?: SimulacionResponse;
  mostrarResultados: boolean = false;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private creditoService: CreditoService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.simulacionForm = this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      // Paso 1: Datos básicos
      idCliente: [null, Validators.required],

      // Paso 2: Configuración financiera
      idMoneda: [1, Validators.required], // PEN por defecto
      monto_principal: [0, [Validators.required, Validators.min(1000)]],
      tasa_anual: [0, [Validators.required, Validators.min(0.1), Validators.max(30)]],
      plazo_meses: [120, [Validators.required, Validators.min(12), Validators.max(360)]],

      // Paso 3: Opciones avanzadas
      idTasa: [1, Validators.required], // Efectiva por defecto
      idCapitalizacion: [1, Validators.required], // Mensual por defecto
      meses_gracia: [0, [Validators.min(0), Validators.max(12)]],
      idGracia: [1, Validators.required], // Parcial por defecto

      // Relaciones
      idEntidad: [null, Validators.required],
    });
  }

  cargarDatosIniciales(): void {
    // Cargar clientes
    this.clienteService.getClientes().subscribe({
      next: (clientes) => (this.clientes = clientes),
      error: (err) => console.error('Error cargando clientes para simulador', err),
    });

    // Cargar datos de configuración
    this.creditoService.getMonedas().subscribe({
      next: (monedas) => (this.monedas = monedas),
      error: (err) => console.error('Error cargando monedas', err),
    });

    this.creditoService.getTiposTasa().subscribe({
      next: (tipos) => (this.tiposTasa = tipos),
      error: (err) => console.error('Error cargando tipos de tasa', err),
    });

    this.creditoService.getCapitalizaciones().subscribe({
      next: (caps) => (this.capitalizaciones = caps),
      error: (err) => console.error('Error cargando capitalizaciones', err),
    });

    this.creditoService.getPeriodosGracia().subscribe({
      next: (gracia) => (this.periodosGracia = gracia),
      error: (err) => console.error('Error cargando periodos de gracia', err),
    });

    this.creditoService.getEntidadesFinancieras().subscribe({
      next: (entidades) => (this.entidades = entidades),
      error: (err) => console.error('Error cargando entidades financieras', err),
    });
  }

  siguientePaso(): void {
    if (this.pasoActual < this.totalPasos) {
      this.pasoActual++;
    }
  }

  pasoAnterior(): void {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  simular(): void {
    if (this.simulacionForm.invalid) {
      this.marcarCamposInvalidos();
      alert('Complete todos los campos requeridos');
      return;
    }

    this.cargando = true;
    const formValue = this.simulacionForm.value;

    // Construir objeto Credito para simulación
    const creditoSimulacion: Credito = {
      monto_principal: formValue.monto_principal,
      tasa_anual: formValue.tasa_anual,
      plazo_meses: formValue.plazo_meses,
      meses_gracia: formValue.meses_gracia,
      fecha_desembolso: new Date(),
      numero_contrato: 'SIM-' + Date.now(),
      estado: 'SIMULACION',

      clientedto: { id_cliente: formValue.idCliente } as any,
      monedadto: { id_moneda: formValue.idMoneda } as any,
      tasadto: { id_tasa: formValue.idTasa } as any,
      capitalizaciondto: { id_capitalizacion: formValue.idCapitalizacion } as any,
      graciadto: { id_gracia: formValue.idGracia } as any,
      entidaddto: { id_entidad: formValue.idEntidad } as any,
    } as Credito;

    this.creditoService.simularCreditoCompleto(creditoSimulacion).subscribe({
      next: (resultado) => {
        this.resultadoSimulacion = resultado;
        this.mostrarResultados = true;
        this.pasoActual = 4;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error en simulación:', error);
        alert('Error al simular el crédito: ' + error.message);
        this.cargando = false;
      },
    });
  }

  guardarCredito(): void {
    if (!this.resultadoSimulacion) {
      alert('Primero debe simular el crédito');
      return;
    }

    const creditoParaGuardar = {
      ...this.resultadoSimulacion.credito,
      numero_contrato: `CTO-${Date.now()}`,
      estado: 'PENDIENTE',
    };

    this.creditoService.crearCredito(creditoParaGuardar).subscribe({
      next: (creditoGuardado) => {
        alert(
          `Crédito guardado exitosamente!\nNúmero: ${creditoGuardado.numero_contrato}`
        );
        this.router.navigate(['/creditos', creditoGuardado.id_credito]);
      },
      error: (error) => {
        console.error('Error guardando crédito:', error);
        alert('Error al guardar el crédito: ' + error.message);
      },
    });
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.simulacionForm.controls).forEach((key) => {
      const control = this.simulacionForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  get paso1Valido(): boolean {
    const campos = ['idCliente'];
    return campos.every((campo) => this.simulacionForm.get(campo)?.valid);
  }

  get paso2Valido(): boolean {
    const campos = ['monto_principal', 'tasa_anual', 'plazo_meses', 'idMoneda'];
    return campos.every((campo) => this.simulacionForm.get(campo)?.valid);
  }

  get paso3Valido(): boolean {
    const campos = ['idTasa', 'idCapitalizacion', 'meses_gracia', 'idGracia', 'idEntidad'];
    return campos.every((campo) => this.simulacionForm.get(campo)?.valid);
  }

  calcularCuotaEstimada(): number {
    const form = this.simulacionForm.value;
    if (!form.monto_principal || !form.tasa_anual || !form.plazo_meses) return 0;

    const tasaMensual = form.tasa_anual / 12 / 100;
    const plazo = form.plazo_meses;
    const monto = form.monto_principal;

    if (tasaMensual === 0) return monto / plazo;

    const factor = Math.pow(1 + tasaMensual, plazo);
    return (monto * (tasaMensual * factor)) / (factor - 1);
  }
}
