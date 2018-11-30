import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage {

  f1 : boolean = false;


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }



  togglef1(){
    this.f1 = !this.f1;
  }
}
