import { Component } from '@angular/core';

import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
   evnt: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  ) {
    this.initializeApp();
   // this.notifications("Test Notification Form anAngel", "Test Notification Form anAngel");
  }

  initializeApp() {
    //this.oneSignal.startInit('35d6502f-6449-4419-8701-38025b695335', 'YjMyNTQ3ZjgtY2E3Zi00MmVhLTg4NWEtNmMzYzk5MzM2YmVl');
    
    //this.oneSignal.startInit('4d7458c0-7f1e-4f40-a998-52703d81507d', '291869820806');

    this.oneSignal.startInit('35d6502f-6449-4419-8701-38025b695335', '364530394642');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
     // do something when notification is received
     console.log(data.payload);
     let msg = data.payload.body;
     let title = data.payload.title;
     let additionalData = data.payload.additionalData;
     //this.showAlert(title, msg, additionalData.task);
      console.log(msg);
     this.notifications(title, msg);

    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      let additionalData = data.notification.payload.additionalData;
 
     // this.showAlert('Notification opened', 'You already read this before', additionalData.task);

    });

    this.oneSignal.endInit();
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#00FFFFFF');
      this.splashScreen.hide();
    });
  }

  async notifications(title, msg) {  
    const popover = await this.popoverCtrl.create({  
        component: NotificationsComponent,
        componentProps:{"title":title, "message": msg},
        animated: true,  
        showBackdrop: true  
    });  
    return await popover.present();  
  }  


}
