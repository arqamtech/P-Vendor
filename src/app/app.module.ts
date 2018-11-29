import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProfilePage } from '../pages/MainPages/profile/profile';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { LoginPage } from '../pages/Auth/login/login';
import { SignUpPage } from '../pages/Auth/sign-up/sign-up';
import { SalesPage } from '../pages/MainPages/sales/sales';
import { InventoryPage } from '../pages/MainPages/inventory/inventory';
import { AddCategoriesPage } from '../pages/Inventory/add-categories/add-categories';
import { CategoriesPage } from '../pages/Inventory/categories/categories';
import { AddProductPage } from '../pages/Inventory/add-product/add-product';
import { NotVerifiedPage } from '../pages/Extra/not-verified/not-verified';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 
import { ChangePassPage } from '../pages/Auth/change-pass/change-pass';
import { NotificationsPage } from '../pages/Notifications/notifications/notifications';
import { SettingsPage } from '../pages/Extra/settings/settings';
import { NotiPopPage } from '../pages/Notifications/noti-pop/noti-pop';
import { ViewBarCodePage } from '../pages/Inventory/view-bar-code/view-bar-code';
import { OrdersPage } from '../pages/MainPages/orders/orders';
import { ChartsModule } from 'ng2-charts';

export const firebaseCred = {
  apiKey: "AIzaSyDfYGCZchTJHmNBlk4-T4-B24d7qtBs4LQ",
  authDomain: "posters-83a2e.firebaseapp.com",
  databaseURL: "https://posters-83a2e.firebaseio.com",
  projectId: "posters-83a2e",
  storageBucket: "posters-83a2e.appspot.com",
  messagingSenderId: "9709869347"
};
firebase.initializeApp(firebaseCred);




@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    SignUpPage,
    ProfilePage,
    SalesPage,
    InventoryPage,
    AddCategoriesPage,
    CategoriesPage,
    AddProductPage,
    ChangePassPage,
    NotVerifiedPage,
    NotificationsPage,
    SettingsPage,
    NotiPopPage,
    ViewBarCodePage,
    OrdersPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxQRCodeModule,
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    SignUpPage,
    ProfilePage,
    SalesPage,
    InventoryPage,
    AddCategoriesPage,
    CategoriesPage,
    AddProductPage,
    ChangePassPage,
    NotVerifiedPage,
    NotificationsPage,
    SettingsPage,
    NotiPopPage,
    ViewBarCodePage,
    OrdersPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,

  ]
})
export class AppModule { }
