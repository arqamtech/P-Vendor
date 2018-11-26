import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  // Image Parameters
  img1: any;
  img2: any;
  url: any;

  // Image Parameters Ended

  cats  :Array<any> = [];


  name: string;
  catSel: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.getCats();
  }

  addProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });
    loading.present();

    firebase.database().ref("Products").push({
     Name : this.name,
     Category : this.catSel.Name,
     TimeStamp : moment().format(),
    }).then((res) => {
      firebase.database().ref("CategorieswiseProducts").child(this.catSel.key).child(res.key).set("true").then(()=>{
        firebase.database().ref("Seller Data/Products").child(firebase.auth().currentUser.uid).child(res.key).set(true).then(()=>{
          this.navCtrl.pop();
          this.presentToast("Product Added");
          loading.dismiss();
        })
      });
    });
  }

  checkData(){
    if(this.name){
      if(this.catSel){
          this.addProduct();
      }else{this.presentToast("Select a Category")}
    }else{this.presentToast("Enter Product Name")}
  }


  getCats() {
    firebase.database().ref("Seller Data/Categories").child(firebase.auth().currentUser.uid).once("value", itemSnap => {
      this.cats = [];
      itemSnap.forEach(snap => {
        firebase.database().ref("Categories").child(snap.key).once("value",itemSnap=>{
          let temp  = itemSnap.val();
          temp.key = itemSnap.key;
          this.cats.push(temp);
        })
      })
      console.log(this.cats)
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


removeImage(){
  this.img1=null;
}
  //Image Uploading Section Ended

}
