import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Subscription } from 'rxjs';
import { Registro } from 'src/model/registro';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-planta',
  templateUrl: './registro-planta.component.html',
  styleUrls: ['./registro-planta.component.css']
})
export class RegistroPlantaComponent implements OnInit, OnDestroy {

  static id: string;
  colunas = ['Planta', 'Umidade mínima (%)', 'Umidade máxima (%)' , 'Umidade Atual (%)', 'Data'];
  registros: Registro[] = [];
  sub: Subscription;
  dataSource: MatTableDataSource<Registro>;
  constructor(private registroServ: RegistroService, private route: ActivatedRoute, private auth: AuthService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.sub = this.registroServ.getPlantaNome(this.route.snapshot.paramMap.get('nome')).subscribe((result: any) => {
      if (result) {
        this.sub = this.registroServ.getPlantas(result._id).subscribe((registro) => {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
