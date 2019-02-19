import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-vendor-banner',
  templateUrl: 'vendor-banner.html',
})
export class VendorBannerPage {

  // Image Parameters
  img1: any;
  img2: any;
  url: any;

  // Image Parameters Ended

  isBanner: boolean = false;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.checkbanner();
  }





  //Image Uploading Section
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }



  checkbanner() {
    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).child("Banner").once("value", itemSnap => {
      if (itemSnap.exists()) {
        this.isBanner = true;
        this.img1 = itemSnap.val();
      } else {
        this.isBanner = false;
      }
    })

  }



  removeImage() {
    this.img1 = null;
  }
  //Image Uploading Section Ended

  close() {
    this.viewCtrl.dismiss();
  }



  uploadImage() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });
    loading.present();
    firebase.storage().ref("Vendor banners").child(firebase.auth().currentUser.uid).put(this.img2).then(() => {
      firebase.storage().ref("Vendor banners").child(firebase.auth().currentUser.uid).getDownloadURL().then((dURL) => {
        firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).child("Banner").set(dURL).then(() => {
          loading.dismiss();
          this.presentToast("Banner Updated");
          this.close();
        })
      })
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


}
