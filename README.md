# ionic4-pwa-push-notification
Push notification using firebase for ionic 4

1 - New project

2 - Install Lib
```sh
npm install firebase @angular/fire --save
```
3 - Import to app.module.ts
```ts
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';

import { environment } from './../environments/environment';
...
imports:[
...
AngularFireModule.initializeApp(environment.firebaseConfig),
AngularFireMessagingModule
],
```  
 4 - Add in enviroment firebaseConfig
 ```ts
 export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
 ```
 5 - Create file firebase-messaging-sw.js intro SRC/
 ```js
 // Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "MESSAGING_SENDER_ID"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  // @ts-ignore
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
 ```
 6 - Tests
```html
<ion-button (click)="requestPermission()">
     Permission get token
 </ion-button>
```
```ts
import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private afMessaging: AngularFireMessaging) { }
  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }
}
```

    
  
