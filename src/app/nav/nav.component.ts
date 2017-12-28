import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    user: Observable<User>;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }

  logout() {
    this.authService.logout().then(onResolve => this.router.navigate(['/']));
  }

}
