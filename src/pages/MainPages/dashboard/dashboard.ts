import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { NotVerifiedPage } from '../../Extra/not-verified/not-verified';
import { NotiPopPage } from '../../Notifications/noti-pop/noti-pop';
import { SettingsPage } from '../../Extra/settings/settings';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  labelsArray : Array<any> = [];
  dataArray : Array<any> = [];


  // Nums
  pendOrdersTot: number = 0;

  prods: Array<any> = [];

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



  LoadCharts() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labelsArray,
        datasets: [{
          data: this.dataArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
  }

    getProducts() {
      this.db.list(`Seller Data/Products/${firebase.auth().currentUser.uid}`, ref => ref.orderByChild('Sales')).snapshotChanges().subscribe(snap => {
        this.prods = [];
        snap.forEach(snip => {
          firebase.database().ref("Products").child(snip.key).once("value", iiSnap => {
            var temp: any = iiSnap.val();
            temp.key = iiSnap.key;
            this.labelsArray.push(temp.Name);
            this.dataArray.push(temp.Sales);
            this.prods.push(temp);
          }).then(()=>{
            this.LoadCharts();
          })
        })
      })
    }





    getUser(){
      firebase.database().ref("Seller Data/Sellers").child(firebase.auth().currentUser.uid).once("value", itemSnap => {
        if (itemSnap.val().Verified == "Unverified") {
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
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}

