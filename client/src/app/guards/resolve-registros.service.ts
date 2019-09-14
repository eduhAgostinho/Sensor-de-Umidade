import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';
import { Registro } from 'src/model/registro';
import { AuthService } from '../services/auth.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolveRegistros implements Resolve<Registro[]> {

  constructor(private regService: RegistroService, private auth: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.regService.getRegistros().pipe(
      take(1),
      mergeMap( registros => {
        if (registros) {
          return of(registros);
        } else {
          this.router.navigate(['/login']);
          return EMPTY;
        }
      })
    );
  }
}
