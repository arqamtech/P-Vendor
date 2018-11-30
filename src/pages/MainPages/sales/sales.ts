import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';


@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  prods: Array<any> = [];
  prodsLoaded: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getProducts();
  }



  getProducts() {
    this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      let tempArray = [];

      this.prods = [];
      snap.forEach(snip => {
        firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
          var temp: any = iiSnap.val();
          temp.key = iiSnap.key;
          tempArray.push(temp);
        })
        this.prods = tempArray;
        this.prodsLoaded = tempArray;
      })
    })
  }

  initializeItems(): void {
    this.prods = this.prodsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.prods = this.prods.filter((v) => {
      if (v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }


  sellConfirm(p) {
    let alert = this.alertCtrl.create({
      title: p.Name,
      subTitle: "How many Products are sold ?",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type: 'number',
          min: '0',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Sell',
          handler: data => {
            if (data.quantity) {
              this.sell(p, data.quantity);
            } else {
              this.presentToast("Enter Quantity");
            }
          }
        }
      ]
    });
    alert.present();
  }


  sell(p, q) {
    if (q > 0 && p.Quantity>q) {
      firebase.database().ref("Products").child(p.key).child("Quantity").transaction(quans => {
        let to = Number(quans);
        let quan = Number(q);
        if (quans) {
          return +to - quan;
        } else {
          return 0;
        }
      }).then(() => {

        firebase.database().ref("Products").child(p.key).child("Sales").transaction(quans => {
          let to = Number(quans);
          let quan = Number(q);
          if (quans) {
            this.presentToast("Product Sold")
            return +to + quan;
          } else {
            this.presentToast("Please Update Inventory")
            return to;
          }

        });



      })
    } else {
      this.presentToast("Quantity Not Valid");
    }

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
