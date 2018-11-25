import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-categories',
  templateUrl: 'add-categories.html',
})
export class AddCategoriesPage {

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

    if(this.catName){


    let loading = this.loadingCtrl.create({
      content: 'Adding Category...'
    });
    loading.present();

    firebase.database().ref("Categories").push(this.catName).then((res)=>{
      firebase.database().ref("Seller Data/Categories").child(firebase.auth().currentUser.uid).child(res.key).set(this.catName).then(()=>{
        this.close();
        this.presentToast("Category Added");
        loading.dismiss();
      })
    });
  }else{
    this.presentToast("Category Name Empty");
  }
  }

  close(){
    this.viewCtrl.dismiss();
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }


}
