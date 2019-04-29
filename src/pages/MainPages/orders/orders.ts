import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  viewPending: boolean = false;
  viewCompleted: boolean = false;

  pendingOrders: Array<any> = [];
  CompletedOrders: Array<any> = [];

  pendingOrdersRef = this.db.list(`Seller Data/Orders/${firebase.auth().currentUser.uid}/Pending`)
  CompletedOrdersRef = this.db.list(`Seller Data/Orders/${firebase.auth().currentUser.uid}/Completed`)

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams
  ) {
    this.getPendingOrders();
    this.getCompletedOrders();
  }








  getPendingOrders() {
    // let loading = this.loadingCtrl.create({
    //   content: 'Logging In...'
    // });
    // loading.present();
    console.log(this.pendingOrders);


    this.pendingOrdersRef.snapshotChanges().subscribe(snap => {
      this.pendingOrders = [];
      snap.forEach(snip => {
        this.db.object(`Orders/${snip.key}`).snapshotChanges().subscribe(oSnap => {
          let temp: any;
          let veryTemp: any = oSnap.payload.val();
          this.db.object(`Products/${veryTemp.ProductKey}`).snapshotChanges().subscribe(pSnap => {
            temp = pSnap.payload.val();
            temp.key = pSnap.key;
            temp.Amount = veryTemp.Amount;
            temp.Quantity = veryTemp.Quantity;
            temp.Status = veryTemp.Status;
            temp.TimeStamp = veryTemp.TimeStamp;
            this.pendingOrders.push(temp);
          })
          console.log(this.pendingOrders);
          // loading.dismiss();
        })
      })
    })




  }








  getCompletedOrders() {

  }



  toggleCompleted() {
    this.viewCompleted = !this.viewCompleted;
  }
  togglePending() {
    this.viewPending = !this.viewPending;
  }

  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
  gtSettings() {
    this.navCtrl.push(SettingsPage);
  }


}
