import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTicketPage } from './add-ticket';

@NgModule({
  declarations: [
    AddTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTicketPage),
  ],
})
export class AddTicketPageModule {}
