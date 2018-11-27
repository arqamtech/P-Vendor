import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { NotVerifiedPage } from '../../Extra/not-verified/not-verified';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {


  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    private menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    // this.getUser();
  }




  getUser(){
    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      if(!itemSnap.val().Verified){
        this.navCtrl.setRoot(NotVerifiedPage);
      }
    })
  }




}

