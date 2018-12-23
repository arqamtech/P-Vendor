import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notis : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public toastCtrl: ToastController,
  public db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.getNoti();
  }

  getNoti(){
    let uuid = firebase.auth().currentUser.uid;
    this.db.list(`Seller Data/Notifications/${uuid}`).snapshotChanges().subscribe(itemSnap=>{
      this.notis = [];
      itemSnap.forEach(snip=>{
        var temp : any = snip.payload.val();
        temp.key = snip.key;
        this.notis.push(temp);
      })
    })
  }

  maRead(n){
    firebase.database().ref("Seller Data/Notifications").child(firebase.auth().currentUser.uid).child(n.key).child("Status").set("Read").then(()=>{
        this.presentToast("Marked as Read");      
    });
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
