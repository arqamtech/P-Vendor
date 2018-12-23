import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { NotificationsPage } from '../notifications/notifications';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-noti-pop',
  templateUrl: 'noti-pop.html',
})
export class NotiPopPage {

  notis : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.getNoti();
  }

  getNoti(){
    this.db.list(`Seller Data/Notifications/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(itemSnap=>{
      this.notis = [];
      itemSnap.forEach(snip=>{
        var temp : any = snip.payload.val();
        temp.key = snip.key;
        if(temp.Status == "Unread"){
          this.notis.push(temp);
        }
      })
    })
  }
  viewAll(){
    this.navCtrl.push(NotificationsPage);
  }
}
