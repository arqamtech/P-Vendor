import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  store: any;
  vis: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl : ToastController,
  ) {
    this.getStore();
  }


  getStore() {
    firebase.database().ref("Seller Data").child("Sellers").child(firebase.auth().currentUser.uid).once("value", item => {
      this.store = item.val();
      this.vis = item.val().Visible;
      console.log(this.vis);
    })
  }


  cVis() {
    switch (this.vis) {
      case true: firebase.database().ref("Seller Data").child("Sellers").child(firebase.auth().currentUser.uid).child("Visible").set(true);
      this.presentToast("Store is now Visible")
        break;
      case false: firebase.database().ref("Seller Data").child("Sellers").child(firebase.auth().currentUser.uid).child("Visible").set(false);
      this.presentToast("Store is now Not Visible")
        break;
    }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
