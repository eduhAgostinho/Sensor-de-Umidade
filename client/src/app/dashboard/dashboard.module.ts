import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrosComponent } from '../dashboard/registros/registros.component';
import { RegistroPlantaComponent } from '../dashboard//registro-planta/registro-planta.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../guards/auth-guard.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { ResolveRegistros } from '../guards/resolve-registros.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  providers: [
    AuthGuard, ResolveRegistros
  ],
  declarations: [
    DashboardComponent,
    RegistrosComponent,
    RegistroPlantaComponent
  ]
})
export class DashboardModule { }
