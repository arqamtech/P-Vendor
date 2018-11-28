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

  editP = this.navParams.get("product");

  // Image Parameters
  img1: any;
  img2: any;
  url: any;

  // Image Parameters Ended

  cats  :Array<any> = [];
  storeName : string;

  name: string;
  catSel: any;
  Quantity : string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.getCats();
    if(this.editP){
      this.name = this.editP.Name;
      this.img1 = this.editP.ImageUrl;
    }
  }

  getUser(){
  }


  addProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });
    loading.present();

    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      var sn = itemSnap.val().StoreName;
    firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(this.name).put(this.img2).then(()=>{
      firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(this.name).getDownloadURL().then((dURL)=>{
        this.url = dURL;
      }).then(()=>{
    firebase.database().ref("Products").push({
     Name : this.name,
     Category : this.catSel.Name,
     CategoryKey : this.catSel.key,
     Quantity : this.Quantity,
     Status :"Pending",
     ImageUrl : this.url,
     StoreKey : firebase.auth().currentUser.uid,
     StoreName : sn,
     Sales : '0',
     TimeStamp : moment().format(),
    }).then((res) => {
      firebase.database().ref("CategorieswiseProducts").child(this.catSel.key).child(res.key).set("true").then(()=>{
        firebase.database().ref("Seller Data/Products").child(firebase.auth().currentUser.uid).child(res.key).set(true).then(()=>{
          firebase.database().ref("Admin Data/Notifications").push({
            Name : this.name,
            Type : "Product Verification Pending",
            Vendor : firebase.auth().currentUser.uid,
            Status : "Unread",
          }).then(()=>{
            this.navCtrl.pop();
            this.presentToast("Product Added");
            loading.dismiss();
          })
        })
      });
    });
  });
});

})

}

  checkData(){
    if(this.name){
      if(this.catSel){
        if(this.img2){
          this.addProduct();
        }else{this.presentToast("Select a Product Image")}
      }else{this.presentToast("Select a Category")}
    }else{this.presentToast("Enter Product Name")}
  }


  getCats() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Categories...'
    });
    loading.present();
    if(this.editP){
        firebase.database().ref("Categories").child(this.editP.CategoryKey).once("value",itemSnap=>{
          let temop  = itemSnap.val();
          temop.key = itemSnap.key;
          this.catSel = temop;
        }).then(()=>{
          loading.dismiss();
        })            
    }else{
    firebase.database().ref("Seller Data/Categories").child(firebase.auth().currentUser.uid).once("value", itemSnap => {
      this.cats = [];
      itemSnap.forEach(snap => {
        firebase.database().ref("Categories").child(snap.key).once("value",itemSnap=>{
          let temp  = itemSnap.val();
          temp.key = itemSnap.key;
          this.cats.push(temp);
        }).then(()=>{
          loading.dismiss();
        });
      });
    });
  }
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
