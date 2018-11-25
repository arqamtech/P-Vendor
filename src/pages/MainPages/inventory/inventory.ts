import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddProductPage } from '../../Inventory/add-product/add-product';
import { CategoriesPage } from '../../Inventory/categories/categories';


@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public modalCtrl: ModalController,
  ) {
  }
  


  gtAddProduct(){
    let profileModal = this.modalCtrl.create(AddProductPage);
    profileModal.present();
  }  

  gtCats(){
    this.navCtrl.push(CategoriesPage);
  }

}
