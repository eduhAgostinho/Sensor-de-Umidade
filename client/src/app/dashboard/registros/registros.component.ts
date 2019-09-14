import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { Registro } from 'src/model/registro';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroPlantaComponent } from '../registro-planta/registro-planta.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tarefas',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit, OnDestroy {
  colunas = ['Planta', 'Umidade mínima (%)', 'Umidade máxima (%)', 'Umidade Atual (%)', 'Data'];
  registros: Registro[] = [];
  sub: Subscription;
  dataSource: MatTableDataSource<Registro>;
  constructor(private registroServ: RegistroService, private auth: AuthService, private route: ActivatedRoute) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.sub = this.route.data.subscribe((data: { registros: Registro[] }) => {
      this.registros = data.registros;
      this.dataSource = new MatTableDataSource<Registro>(this.registros);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
      if (err.error.status === 401) {
        this.auth.logout();
      }
    });
  }

  sendId(id: string) {
    RegistroPlantaComponent.id = id;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
