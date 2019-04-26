import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  cats: Array<any> = [];
  subCats: Array<any> = [];
  SubCatItem: Array<any> = [];

  catSel: any;
  SubCatSel: any;
  subCatItemSel: any;

  storeName: string;


  name: string;
  Quantity: string;
  Price: string;
  //Attributes
  isCols: boolean = false;
  colorsEntered: string = '';
  description: string;
  isSize: boolean = false;
  sizeEntered: string = '';
  bName: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.getCats();
    if (this.editP) {
      this.name = this.editP.Name;
      this.img1 = this.editP.ImageUrl;
    }
  }



  addProduct() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Product...'
    });
    loading.present();

    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value", itemSnap => {
      var sn = itemSnap.val().StoreName;
      firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(this.name).put(this.img2).then(() => {
        firebase.storage().ref("Products").child(firebase.auth().currentUser.uid).child(this.name).getDownloadURL().then((dURL) => {
          this.url = dURL;
        }).then(() => {
          firebase.database().ref("Products").push({
            Name: this.name,
            Category: this.catSel.Name,
            CategoryKey: this.catSel.key,
            SubCategory: this.SubCatSel,
            SubCategoryKey: this.SubCatSel.key,
            SubCategoryItem: this.subCatItemSel,
            SubCategoryItemKey: this.subCatItemSel.key,
            BrandName: this.bName,
            Quantity: this.Quantity,
            Status: "Pending",
            ImageUrl: this.url,
            StoreKey: firebase.auth().currentUser.uid,
            StoreName: sn,
            Sales: '0',
            Price: this.Price,
            Color: this.colorsEntered,
            Size: this.sizeEntered,
            Description: this.description,
            TimeStamp: moment().format(),
          }).then((res) => {
            firebase.database().ref("CategoriesWiseProducts").child(this.catSel.key).child(res.key).set("true").then(() => {
              firebase.database().ref("SubCategoriesWiseProducts").child(this.SubCatSel.key).child(res.key).set("true").then(() => {
                firebase.database().ref("SubCategoriesItemWiseProducts").child(this.subCatItemSel.key).child(res.key).set("true").then(() => {
                  firebase.database().ref("Seller Data/Products").child(firebase.auth().currentUser.uid).child(res.key).set(true).then(() => {
                    firebase.database().ref("Admin Data/Notifications").push({
                      Name: this.name,
                      Type: "Product Verification Pending",
                      Vendor: firebase.auth().currentUser.uid,
                      ProductKey: res.key,
                      Status: "Unread",
                    }).then(() => {
                      this.navCtrl.pop();
                      this.presentToast("Product Added");
                      loading.dismiss();
                    })
                  })
                })
              })
            });
          });
        });
      });

    })


  }

  checkData() {
    if (this.name) {
      if (this.catSel) {
        if (this.SubCatSel) {
          if (this.subCatItemSel) {
            if (this.Price) {
              if (this.img2) {
                this.addProduct();
              } else { this.presentToast("Select a Product Image") }
            } else { this.presentToast("Select a Price") }
          } else { this.presentToast("Select a Sub Category Item") }
        } else { this.presentToast("Select a Sub Category") }
      } else { this.presentToast("Select a Category") }
    } else { this.presentToast("Enter Product Name") }
  }


  getCats() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Categories...'
    });
    loading.present();
    firebase.database().ref("Categories").once("value", itemSnap => {
      itemSnap.forEach(ssnip => {
        let temop = ssnip.val();
        temop.key = ssnip.key;
        this.cats.push(temop);
      })
    }).then(() => {
      loading.dismiss();
    }).catch((e) => {
      loading.dismiss();
      this.presentToast("Please Add Categores First");
    })
  }
  getSubCats() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Sub Categories...'
    });
    loading.present();
    firebase.database().ref("SubCatsIndex").child(this.catSel.key).once("value", itemSnap => {
      itemSnap.forEach(ssnip => {
        firebase.database().ref("SubCategories").child(ssnip.key).once("value", isnap => {
          var te = isnap.val();
          te.key = isnap.key;
          this.subCats.push(te);
        }).then(() => {
          loading.dismiss();
        }).catch((e) => {
          loading.dismiss();
          this.presentToast("Please Add Categores First");
        })
      })
    })
  }
  getSubCatItems() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Sub Category Items...'
    });
    loading.present();
    firebase.database().ref("SubCatsItemsIndex").child(this.SubCatSel.key).once("value", itemSnap => {
      itemSnap.forEach(ssnip => {
        firebase.database().ref("SubCategoriesItems").child(ssnip.key).once("value", isnap => {
          var tei = isnap.val();
          tei.key = isnap.key;
          this.SubCatItem.push(tei);
        }).then(() => {
          loading.dismiss();
        }).catch((e) => {
          loading.dismiss();
          this.presentToast("Please Add Categores First");
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


  removeImage() {
    this.img1 = null;
  }
  //Image Uploading Section Ended

}
