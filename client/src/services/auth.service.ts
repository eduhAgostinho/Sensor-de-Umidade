import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;
  constructor(private _router: Router, private http: HttpClient) { }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
  */
  
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('http://localhost:3000/auth/login', user, httpOptions)
  }
    
  clear(): void {
    localStorage.removeItem('token');
  }

  setLocalStorage(data) {
    localStorage.setItem('token', data.token);
    this.token = data.token;
    this._router.navigate(['/dashboard']);
  }

  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  isTokenExpired() {
    const token = localStorage.getItem('token');
    const payload = jwt_decode(token).exp;
    const nowTimestamp = Math.floor(+new Date() / 1000);
    if (payload > nowTimestamp) {
      return false;
    }
    return true;
  }

  private tratarErro<T>(resultado?: T) {
    return (erro: HttpErrorResponse): Observable<T> => {
      if (erro.status === 404) {
        alert('Not Found');
        return of(resultado as T);
      } else if (erro.status === 500) {
        alert('Erro Interno');
        return of(resultado as T);
      }
    };
  }

}
