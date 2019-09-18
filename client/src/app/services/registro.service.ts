import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registro } from 'src/model/registro';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private readonly urlBase = environment.url;

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient, private auth: AuthService, private location: Location) {}

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.urlBase}/registro`)
    .pipe(catchError(this.tratadorError([])));
  }

  getPlantas(id: string): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.urlBase}/registro/search?idPlanta=${id}`)
    .pipe(catchError(this.tratadorError([])));
  }

  getPlantaNome(nome: string) {
    return this.http.get<Registro>(`${this.urlBase}/planta/${nome}`)
    .pipe(catchError(this.tratadorError()));
  }

  postSubscription(subs) {
    return this.http.post(`${this.urlBase}/subscribe`, subs, this.httpOptions);
  }

  private tratadorError<T>(resultado?: T) {
    return (erro: HttpErrorResponse): Observable<T> => {
      if (erro.status === 404) {
        alert('Not Found');
        return of(resultado as T);
      } else if (erro.status === 500) {
        alert('Erro Interno');
        return of(resultado as T);
      } else if (erro.status === 401) {
        return of(resultado as T);
      }
    };
  }

}
