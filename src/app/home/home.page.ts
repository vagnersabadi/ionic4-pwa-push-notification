import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private afMessaging: AngularFireMessaging) { }


  requestPermission() {
    this.afMessaging.requestPermission.subscribe(
      () => { console.log('Permission granted!'); },
      (error) => { console.error(error); },
    );
  }

  requestPermissionToken() {
    this.afMessaging.requestToken.subscribe(
      (token) => { console.log('Permission granted! Save to the server!', token); },
      (error) => { console.error(error); },
    );
  }

  deleteToken() {
    this.afMessaging.getToken.pipe(
      mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Deleted!'); },
      );
  }


  listen() {
    this.afMessaging.messages.subscribe((message) => {
      console.log(message);
    });
  }
}
