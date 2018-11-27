import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotiPopPage } from './noti-pop';

@NgModule({
  declarations: [
    NotiPopPage,
  ],
  imports: [
    IonicPageModule.forChild(NotiPopPage),
  ],
})
export class NotiPopPageModule {}
