import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { FaqsPage } from '../../Help/faqs/faqs';
import { ViewticketsPage } from '../../Help/Tickets/viewtickets/viewtickets';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
  }


  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
  gtSettings() {
    this.navCtrl.push(SettingsPage);
  }



  gtTickets() {
    this.navCtrl.push(ViewticketsPage);
  }

  gtFaqs() {
    this.navCtrl.push(FaqsPage);
  }

}
