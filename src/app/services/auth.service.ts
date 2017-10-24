import { Credential } from './../../models/credentials/credentials';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  
  constructor(public afAuth: AngularFireAuth) { }
  login(user: Credential) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: Credential) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

}
