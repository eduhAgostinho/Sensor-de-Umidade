import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;
  constructor(private router: Router, private http: HttpClient, private storageService: StorageService) { }

  isAuthenticated(): boolean {
    return this.storageService.get('token') != null && !this.isTokenExpired();
  }

  login(user: User): Observable<{ token: string }> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<{ token: string }>('http://localhost:3000/auth/login', user, httpOptions);
  }

  clear(): void {
    this.storageService.clear();
  }

  setLocalStorage(data) {
    this.storageService.set('token', data.token);
    this.token = data.token;
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.clear();
    this.router.navigate(['/login']);
  }

  isTokenExpired() {
    const token = this.storageService.get('token');
    const payload = jwt_decode(token).exp;
    const nowTimestamp = Math.floor(+new Date() / 1000);
    if (payload > nowTimestamp) {
      return false;
    }
    return true;
  }


}
