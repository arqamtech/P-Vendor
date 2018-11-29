import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { NotVerifiedPage } from '../../Extra/not-verified/not-verified';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  


  // Nums
  pendOrdersTot : number = 0;
  
  prods : Array<any> = [];

  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    private menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
  ) {
    this.menuCtrl.enable(true);
    this.getUser();
    this.getProducts();
  }






  getProducts() {
    this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`,ref=>ref.orderByChild('Sales')).snapshotChanges().subscribe(snap => {
       this.prods = [];
      snap.forEach(snip => {
        firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
          var temp: any = iiSnap.val();
          temp.key = iiSnap.key;
          this.doughnutChartLabels.push(temp.Name);
          this.doughnutChartData.push(temp.Sales);
          this.prods.push(temp);
        })
      })
    })
  }





  getUser(){
    firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value",itemSnap=>{
      if(itemSnap.val().Verified=="Unverified"){
        this.navCtrl.setRoot(NotVerifiedPage);
      }
    })
  }







  gtNoti(myEvent) {
    let popover = this.popoverCtrl.create(NotiPopPage);
    popover.present({
      ev: myEvent
    });
  }
  gtSettings(){
    this.navCtrl.push(SettingsPage);
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }


}

