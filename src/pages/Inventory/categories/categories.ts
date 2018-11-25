import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddCategoriesPage } from '../add-categories/add-categories';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  cats : Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public db : AngularFireDatabase,
  ) {
    this.getCats();
  }


  getCats(){
    this.db.list(`Seller Data/Categories/${firebase.auth().currentUser.uid}`).snapshotChanges().subscribe(snap=>{
      this.cats = [];
      snap.forEach(snip=>{
        var temp : any = snip.payload.val();
        this.cats.push(temp);
      })
    })
  }




  gtAddCat() {
    let profileModal = this.modalCtrl.create(AddCategoriesPage);
    profileModal.present();
  }
}
