import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardLogin } from './guards/auth-guard-login.service';

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuardLogin] ,component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard/registros', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard/planta/:nome', redirectTo: 'dashboard/planta/:nome', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
