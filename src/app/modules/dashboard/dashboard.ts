import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // Datos del dashboard
  totalClientes: number = 0;
  totalCreditos: number = 0;
  creditosActivos: number = 0;
  carteraVigente: number = 0;
  carteraVencida: number = 0;

  // Gráficos
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55], label: 'Créditos Aprobados' },
      { data: [28, 48, 40, 19, 86, 27], label: 'Pagos Recibidos' }
    ]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: ['Activos', 'Pagados', 'Vencidos', 'Cancelados'],
    datasets: [{
      data: [40, 30, 15, 15],
      backgroundColor: ['#4CAF50', '#2196F3', '#F44336', '#FF9800']
    }]
  };

  constructor() {}

  ngOnInit(): void {
    // Aquí cargarás datos reales del backend
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard(): void {
    // Por ahora datos de prueba
    this.totalClientes = 125;
    this.totalCreditos = 89;
    this.creditosActivos = 67;
    this.carteraVigente = 1250000;
    this.carteraVencida = 85000;
  }
}
