import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { User } from 'src/model/user';
import { AuthService } from './../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = { username: '', password: '' };
  sub: Subscription;
  erro: boolean;
  mensagem: string;
  constructor(private auth: AuthService, private route: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.sub = this.auth.login(this.user).subscribe((token) => {
      this.erro = false;
      this.storage.set('token', token.token);
      this.route.navigate(['']);
    }, (err) => {
      this.erro = true;
      this.mensagem = err.error.message;
    });
  }

  erroFalse() {
    this.erro = false;
  }
}
