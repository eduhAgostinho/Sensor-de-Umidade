import { Routes } from '@angular/router';
import { RegistroPlantaComponent } from './registro-planta/registro-planta.component';
import { RegistrosComponent } from './registros/registros.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { ResolveRegistros } from '../guards/resolve-registros.service';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', resolve: { registros: ResolveRegistros }, component: RegistrosComponent},
      { path: 'registros',  resolve: { registros: ResolveRegistros }, component: RegistrosComponent },
      { path: 'planta/:nome', component: RegistroPlantaComponent },
    ]
  }
];
