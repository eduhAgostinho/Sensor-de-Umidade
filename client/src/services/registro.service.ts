import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Registro } from 'src/model/registro';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private readonly urlBase = 'http://localhost:3000/api/registro';
  private readonly urlBase2 = 'http://localhost:3000/api/planta';
  private token: string = this.auth.token;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`})
  };
  constructor(private http: HttpClient, private auth: AuthService, private location: Location) {}

  getRegistros(): Observable<Registro[]> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`})
    };
    return this.http.get<Registro[]>(this.urlBase, options)
    .pipe(catchError(this.tratadorError([])));
  }

  getPlantas(id: string): Observable<Registro[]> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`})
    };
    return this.http.get<Registro[]>(`${this.urlBase}/search?idPlanta=${id}`, options)
    .pipe(catchError(this.tratadorError([])));
  }

  getPlantaNome(nome: string) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`})
    };
    return this.http.get<Registro>(`${this.urlBase2}/${nome}`, options)
    .pipe(catchError(this.tratadorError()));
  }

  postSubscription(subs) {
    return this.http.post('http://localhost:3000/api/subscribe', subs, this.httpOptions);
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
        console.log(localStorage.getItem('token'));
        return of(resultado as T);
      } 
    };
  }

}
