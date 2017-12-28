import { Credential } from './../../models/credentials/credentials';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/users/user';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService {

  user: Observable<User>;
  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore,
    public router: Router, public notify: NotificationService) {
      this.user = this.afAuth.authState;
    }
  login(user: Credential) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
                // .then((userInfo) => {
                //     this.notify.update('Welcome back to the Website!!!', 'success');
                //     // return this.updateUserData(userInfo);
                // }).catch((error) => {
                //   this.handleError(error);
                // });
  }

  register(user: Credential) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
                // .then((userInfo) => {
                //   userInfo.updateProfile({displayName: user.displayName}).then(() => {
                //     this.notify.update('Welcome to the Website!!!', 'success');
                //     // return this.updateUserData(userInfo);
                //   }).catch((err) => {
                //     this.handleError(err);
                //   });
                // }).catch((error) => {
                //   this.handleError(error);
                // });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.user;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oauth(provider);
  }

  private oauth(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
              // .then((cred) => {
              //   this.notify.update('Welcome to the Website!!!', 'success');
              //   return this.updateUserData(cred.user);
              // }).catch((error) => {
              //   this.handleError(error);
              // });
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      bio: user.bio || null,
      dob: user.dob || null,
      gender: user.gender || null,
      address: user.address || null,
      location: user.location || null,
      friends: user.friends || null
    };
    return userRef.set(data);
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
              .then(() => this.notify.update('Password reset email sent!!!', 'info'))
              .catch((error) => {
                this.handleError(error);
              });
  }

  private handleError(error) {
    this.notify.update(error.message, 'error');
  }

}
