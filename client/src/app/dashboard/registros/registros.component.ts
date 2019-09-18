import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { Registro } from 'src/model/registro';
import { MatPaginator, MatSnackBar } from '@angular/material';
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
  snackErro = { msg: 'Aconteceu um erro, tente novamente mais tarde', acao: 'OK' };
  snackSemDados = { msg: 'Nenhum dado foi encontrado', acao: 'OK' };
  constructor(
    private registroServ: RegistroService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.sub = this.route.data.subscribe((data: { registros: Registro[] }) => {
      if (data.registros.length === 0) {
        this.abrirSnackBar(this.snackSemDados.msg, this.snackSemDados.acao);
      }
      this.registros = data.registros;
      this.dataSource = new MatTableDataSource<Registro>(this.registros);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      if (err.error.status === 401) {
        this.auth.logout();
      } else {
        this.abrirSnackBar(this.snackErro.msg, this.snackErro.acao);
      }
    });
  }

  abrirSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 3000,
      panelClass: ['snackbarErro']
    });
  }

  sendId(id: string) {
    RegistroPlantaComponent.id = id;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
