import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTicketPage } from '../add-ticket/add-ticket';


@IonicPage()
@Component({
  selector: 'page-viewtickets',
  templateUrl: 'viewtickets.html',
})
export class ViewticketsPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }





  gtAddTicket(){
    this.navCtrl.push(AddTicketPage);
  }
}
