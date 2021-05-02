import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Auth from '@aws-amplify/auth';
import {Hub} from 'aws-amplify';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly router: Router, private zone: NgZone) {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          this.updateUserStatus();
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          this.loggedIn.next(false);
          this.updateUserStatus();
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
      }
    });

    this.updateUserStatus();
  }

  getAuthState(): Observable<boolean> {
    return this.loggedIn.pipe();
  }

  getUserInfo(): Observable<any> {
    return this.user.pipe();
  }

  logout(): void {
    Auth.signOut().then(() => this.loggedIn.next(false));
  }

  private updateUserStatus() {
    Auth.currentUserInfo().then((user) => {
      if (user !== null) {
        this.user.next(user);
        this.loggedIn.next(true);

        this.zone.run(() => {
          this.router.navigateByUrl('/items').then();
        })
      } else {
        this.user.next(null);
        this.loggedIn.next(false);
      }
    });
  }
}
