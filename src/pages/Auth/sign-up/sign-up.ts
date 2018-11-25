import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import moment from 'moment';
import { DashboardPage } from '../../MainPages/dashboard/dashboard';



@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  StoreName: string;
  OwnerName: string;
  PhoneNumber: string;
  StoreCategory: string;
  StoreLocation: string;
  email: string;
  pass: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl : MenuController,
  ) {
    this.menuCtrl.enable(false);
  }


  checkData() {
    if (this.StoreName) {
      if (this.OwnerName) {
        if (this.PhoneNumber) {
          if (this.StoreCategory) {
            if (this.StoreLocation) {
              if (this.email) {
                if (this.pass) {
                  this.signUp();
                } else { this.presentToast("Enter Password"); }
              } else { this.presentToast("Enter Email Id"); }
            } else { this.presentToast("Enter a Store Location"); }
          } else { this.presentToast("Enter Store Category"); }
        } else { this.presentToast("Enter Phone Number"); }
      } else { this.presentToast("Enter Owner Name"); }
    } else { this.presentToast("Enter Store Name"); }
  }


  signUp() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.auth().createUserWithEmailAndPassword(this.email, this.pass).then(() => {
      firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).set({
        StoreName :this.StoreName,
        OwnerName :this.OwnerName,
        PhoneNumber :this.PhoneNumber,
        StoreCategory :this.StoreCategory,
        StoreLocation :this.StoreLocation,
        Email :this.email,
        Pass :this.pass,
        Status : "Unverified",
        TimeStamp : moment().format(),
      }).then(()=>{
        this.navCtrl.setRoot(DashboardPage);
        loading.dismiss();
      })


    }).catch((e) => {
      var err = e.message;
      this.presentToast(err);
      loading.dismiss();
    })

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
  gtLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
