import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

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

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public db : AngularFireDatabase,    
  public loadingCtrl: LoadingController,
  private menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    this.getVendor();
  }





  getVendor(){
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    this.db.object(`Seller Data/Sellers/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap=>{
      var temp : any = snap.payload.val();
      this.StoreName = temp.StoreName;
      this.OwnerName = temp.OwnerName;
      this.PhoneNumber = temp.PhoneNumber;
      this.StoreCategory = temp.StoreCategory;
      this.StoreLocation = temp.StoreLocation;
      this.email = temp.Email;
      this.pass = temp.Pass;
      this.created = temp.TimeStamp;
    })
    loading.dismiss();
  }

}