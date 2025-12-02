import { Routes } from '@angular/router';
import {DashboardComponent} from './modules/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // Lazy loading de módulos (cuando existan)
  /*
  {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'creditos',
    loadChildren: () => import('./modules/creditos/creditos.module').then(m => m.CreditosModule)
  },
  {
    path: 'simulador',
    loadChildren: () => import('./modules/creditos/creditos.module').then(m => m.CreditosModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./modules/pagos/pagos.module').then(m => m.PagosModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
  },
  */

  // Página 404
  { path: '**', redirectTo: '/dashboard' }
];

