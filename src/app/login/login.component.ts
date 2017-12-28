import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credential } from '../../models/credentials/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin= {} as Credential;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.auth.login(this.userLogin).then((resolve) => {
      this.router.navigate(['home']);
    }).catch(error => console.log(error));
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
