import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, PopoverController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';
import { VendorBannerPage } from '../../Extra/vendor-banner/vendor-banner';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  StoreName: string;
  OwnerName: string;
  PhoneNumber: string;
  StoreCategory: string;
  StoreLocation: string;
  email: string;
  pass: string;
  created: string;
  status: string;
  Banner : string;


  bannerText: string = "Add Banner";
  isBanner : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,
    private menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    this.getVendor();
  }





  getVendor() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    this.db.object(`Seller Data/Sellers/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap => {
      var temp: any = snap.payload.val();
      this.StoreName = temp.StoreName;
      this.OwnerName = temp.OwnerName;
      this.PhoneNumber = temp.PhoneNumber;
      this.StoreCategory = temp.StoreCategory;
      this.StoreLocation = temp.StoreLocation;
      this.email = temp.Email;
      this.pass = temp.Pass;
      this.created = temp.TimeStamp;
      this.status = temp.Status;
      if(temp.Banner){
        this.Banner = temp.Banner;
        this.bannerText = "Edit Banner"
        this.isBanner = true;
      }else{
        this.bannerText = "Add Banner"
        this.isBanner = false;
      }

    })
    loading.dismiss();
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



  gtaddBanner() {
    const modal = this.modalController.create(VendorBannerPage)
    modal.present();
  }

}