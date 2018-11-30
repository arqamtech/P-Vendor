import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewticketsPage } from './viewtickets';

@NgModule({
  declarations: [
    ViewticketsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewticketsPage),
  ],
})
export class ViewticketsPageModule {}
