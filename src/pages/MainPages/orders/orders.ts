import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  viewPending : boolean = false;
  viewCompleted : boolean = false;


  constructor(
  public navCtrl: NavController, 
  public popoverCtrl: PopoverController,
  public navParams: NavParams
  ) {
  }












  toggleCompleted(){
    this.viewCompleted = !this.viewCompleted;
  }
  togglePending(){
    this.viewPending = !this.viewPending;
  }

  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
  gtSettings(){
    this.navCtrl.push(SettingsPage);
  }


}
