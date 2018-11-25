import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

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
  }

}
