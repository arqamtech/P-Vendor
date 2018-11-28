import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public menuCtrl : MenuController,
  ) {
    this.menuCtrl.enable(true);
  }


}
