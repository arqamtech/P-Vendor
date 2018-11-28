import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-bar-code',
  templateUrl: 'view-bar-code.html',
})
export class ViewBarCodePage {

  product =  this.navParams.get("product");
  createdCode = null;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.createdCode = this.product.key;
    console.log(this.product);
  }


  pBar(){
    window.print();
  }

}
