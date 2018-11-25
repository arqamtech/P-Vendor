import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  catName : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl : LoadingController,
    public toastCtrl : ToastController,
    public viewCtrl : ViewController,
    ) {
  }

  addCat(){
    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });
    loading.present();

    firebase.database().ref("Products").push(this.catName).then(()=>{
      this.close();
      this.presentToast("Product Added");
      loading.dismiss();
    });
  }
  close(){
    this.viewCtrl.dismiss();
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
