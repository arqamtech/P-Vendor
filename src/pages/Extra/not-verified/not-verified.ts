import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-not-verified',
  templateUrl: 'not-verified.html',
})
export class NotVerifiedPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public menuCtrl : MenuController,
  ) { 
    this.menuCtrl.enable(false);
  }


}
