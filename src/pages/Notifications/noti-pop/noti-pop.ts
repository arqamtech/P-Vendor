import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { NotificationsPage } from '../notifications/notifications';

@IonicPage()
@Component({
  selector: 'page-noti-pop',
  templateUrl: 'noti-pop.html',
})
export class NotiPopPage {

  notis : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getNoti();
  }

  getNoti(){
    firebase.database().ref("Sellers Data").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      this.notis = [];
      itemSnap.forEach(snap=>{
        var temp : any = snap.val();
        temp.key = snap.key;
        if(temp.Status=="Unread"){
          this.notis.push(temp);
        }
      })
    })
  }
  viewAll(){
    this.navCtrl.push(NotificationsPage);
  }
}
