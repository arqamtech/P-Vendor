import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, AlertController, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { AddProductPage } from '../../Inventory/add-product/add-product';
import { CategoriesPage } from '../../Inventory/categories/categories';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { NotificationsPage } from '../../notifications/notifications';
import { NotiPopPage } from '../../noti-pop/noti-pop';
import { SettingsPage } from '../../settings/settings';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  prods: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
  ) {
    this.menuCtrl.enable(true);
    this.getProducts();
  }

  getProducts() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Products List...'
    });
    // loading.present();

    this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      this.prods = [];
      snap.forEach(snip => {
        firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
          var temp: any = iiSnap.val();
          temp.key = iiSnap.key;
          this.prods.push(temp);
        }).then(() => {
          // loading.dismiss();
        })
      })
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
  addInventory(p) {
    let alert = this.alertCtrl.create({
      title: p.Name,
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
          text: 'Add',
          handler: data => {
            if (data.quantity) {
              this.UpdateQuantity(p, data.quantity);
            } else {
              this.presentToast("Enter Quantity");
            }
          }
        }
      ]
    });
    alert.present();
  }

  UpdateQuantity(p, q) {
    if (q > 0) {

      firebase.database().ref("Products").child(p.key).child("Quantity").transaction(quans => {
        // console.log(quans.val());
        let to = Number(quans);
        let quan = Number(q);
        if (quans) {
          this.presentToast("Quantity Updated")
          return +to + quan;
        } else {
          this.presentToast("Quantity Updated")
          return quan;
        }
      })
    } else {
      this.presentToast("Quantity Not Valid");
    }
  }

  gtAddProduct() {
    this.navCtrl.push(AddProductPage);
  }

  gtCats() {
    this.navCtrl.push(CategoriesPage);
  }
  delPConfirm(p) {
    let alert = this.alertCtrl.create({
      title: 'Remove Product ?',
      message: 'This Product cannot be recovered again.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.delP(p);
          }
        }
      ]
    });
    alert.present();
  }
  delP(p) {

    let loading = this.loadingCtrl.create({
      content: 'Removing Product...'
    });

    firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(p.Name).delete().then(() => {
      firebase.database().ref("Products").child(p.key).remove().then(() => {
        firebase.database().ref("CategorieswiseProducts").child(p.CategoryKey).child(p.key).remove().then(() => {
          firebase.database().ref("Seller Data/Products").child(firebase.auth().currentUser.uid).child(p.key).remove().then(() => {
            loading.dismiss();
            this.presentToast("Product Deleted");
          })
        })
      })
    })
  }

  edit(p) {
    this.navCtrl.push(AddProductPage, { product: p })
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