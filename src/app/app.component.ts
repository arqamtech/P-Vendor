import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import { ProfilePage } from '../pages/MainPages/profile/profile';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { SalesPage } from '../pages/MainPages/sales/sales';
import { InventoryPage } from '../pages/MainPages/inventory/inventory';
import { OrdersPage } from '../pages/MainPages/orders/orders';
import { HelpPage } from '../pages/MainPages/help/help';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;

  full: boolean = true;

  pages: Array<{ title: string, component: any, icon: any, color: string }>;

  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "ios-analytics", color: "whiter" },
      { title: 'Sales', component: SalesPage, icon: "ios-cash", color: "whiter" },
      { title: 'Orders', component: OrdersPage, icon: "md-cart", color: "whiter" },
      { title: 'Inventory', component: InventoryPage, icon: "logo-buffer", color: "whiter" },
      { title: 'Profile', component: ProfilePage, icon: "ios-person", color: "whiter" },
      { title: 'Help', component: HelpPage, icon: "ios-help-buoy", color: "whiter" },


    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.rootPage = InventoryPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


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
  collapse() {
    this.full = false;
  }
  expand() {
    this.full = true;
  }

}
