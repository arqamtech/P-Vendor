import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddProductPage } from '../../Inventory/add-product/add-product';
import { CategoriesPage } from '../../Inventory/categories/categories';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  prods  : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public db : AngularFireDatabase,
  public modalCtrl: ModalController,
  ) {
    this.getProducts();
  }
  
  getProducts(){
    this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap=>{
      this.prods = [];
      snap.forEach(snip=>{
        firebase.database().ref("Products").child(snip.key).once("value",iiSnap=>{
          var temp : any = iiSnap.val();
          temp.key = iiSnap.key;
          this.prods.push(temp);
        })

        
      })
      
    })

  }

  gtAddProduct(){
    this.navCtrl.push(AddProductPage);
    // let profileModal = this.modalCtrl.create(AddProductPage);
    // profileModal.present();
  }  

  gtCats(){
    this.navCtrl.push(CategoriesPage);
  }

}
