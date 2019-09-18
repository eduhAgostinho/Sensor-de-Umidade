import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Subscription } from 'rxjs';
import { Registro } from 'src/model/registro';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-planta',
  templateUrl: './registro-planta.component.html',
  styleUrls: ['./registro-planta.component.css']
})
export class RegistroPlantaComponent implements OnInit, OnDestroy {

  static id: string;
  colunas = ['Planta', 'Umidade mínima (%)', 'Umidade máxima (%)', 'Umidade Atual (%)', 'Data'];
  registros: Registro[] = [];
  sub: Subscription;
  dataSource: MatTableDataSource<Registro>;
  snackErro = { msg: 'Aconteceu um erro, tente novamente mais tarde', acao: 'OK' };
  snackSemDados = { msg: 'Nenhum dado foi encontrado', acao: 'OK' };
  constructor(
    private registroServ: RegistroService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.sub = this.registroServ.getPlantaNome(this.route.snapshot.paramMap.get('nome')).subscribe((result: any) => {
      if (result) {
        this.sub = this.registroServ.getPlantas(result._id).subscribe((registro) => {
          if (registro.length === 0) {
            this.abrirSnackBar(this.snackSemDados.msg, this.snackSemDados.acao);
          }
          this.registros = registro;
          this.dataSource = new MatTableDataSource<Registro>(this.registros);
          this.dataSource.paginator = this.paginator;
        });
      }
    }, (error) => {
      if (error.error.status === 401) {
        this.auth.logout();
      }
    });
  }

  abrirSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 3000,
      panelClass: ['snackbarErro']
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
