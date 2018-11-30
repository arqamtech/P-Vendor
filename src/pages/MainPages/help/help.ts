import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FaqsPage } from '../../Help/faqs/faqs';
import { ViewticketsPage } from '../../Help/Tickets/viewtickets/viewtickets';


@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }


  gtTickets(){
    this.navCtrl.push(ViewticketsPage);
  }

  gtFaqs(){
    this.navCtrl.push(FaqsPage);
  }

}
