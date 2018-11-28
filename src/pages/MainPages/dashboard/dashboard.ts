import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { NotVerifiedPage } from '../../Extra/not-verified/not-verified';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {


  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    private menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
  ) {
    this.menuCtrl.enable(true);
    // this.getUser();
  }




  getUser(){
    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      if(!itemSnap.val().Verified){
        this.navCtrl.setRoot(NotVerifiedPage);
      }
    })
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

