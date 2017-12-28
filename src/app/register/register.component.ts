import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credential } from '../../models/credentials/credentials';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister = {} as Credential;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

/*   get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get displayName(){
    return this.registerForm.get('displayName');
  } */

  register() {
    this.authService.register(this.userRegister).then((resolve) => {
      this.router.navigate(['login']);
    }).catch(error => console.log(error));
  }

}
