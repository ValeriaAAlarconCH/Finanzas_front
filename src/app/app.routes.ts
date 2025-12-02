import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard';

// Clientes
import { ClientesList } from './modules/clientes/clientes-list/clientes-list';
import { ClienteDetail } from './modules/clientes/cliente-detail/cliente-detail';
import { ClienteForm } from './modules/clientes/cliente-form/cliente-form';

// Créditos
import { CreditosList } from './modules/creditos/creditos-list/creditos-list';
import { CreditoForm } from './modules/creditos/credito-form/credito-form';
import { CreditoDetail } from './modules/creditos/credito-detail/credito-detail';
import { SimuladorCredito } from './modules/creditos/simulador-credito/simulador-credito';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Clientes
  { path: 'clientes', component: ClientesList },
  { path: 'clientes/nuevo', component: ClienteForm },
  { path: 'clientes/editar/:id', component: ClienteForm },
  { path: 'clientes/:id', component: ClienteDetail },

  // Créditos
  { path: 'creditos', component: CreditosList },
  { path: 'creditos/nuevo', component: CreditoForm },
  { path: 'creditos/editar/:id', component: CreditoForm },
  { path: 'creditos/:id', component: CreditoDetail },

  // Simulador
  { path: 'simulador', component: SimuladorCredito },

  { path: '**', redirectTo: '/dashboard' },
];
