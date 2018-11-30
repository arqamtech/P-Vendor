import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-ticket',
  templateUrl: 'add-ticket.html',
})
export class AddTicketPage {
  
  title : string;
  description : string;
  
  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
  }


  checkData(){
    if(this.title){
      if(this.description){
        this.addTicket();
      }else{this.presentToast("Enter a Description");}
    }else{this.presentToast("Enter a Title");}
  }

  addTicket(){
    // firebase.database().ref("")
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }

}
