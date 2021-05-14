import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  title: string;
  message: number;


  constructor(    private navParams: NavParams
    ) {
      this.title = this.navParams.data.title;
      this.message = this.navParams.data.message;

      console.log("Message", this.message);
     }

  ngOnInit() {}

}
