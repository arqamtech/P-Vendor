import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBarCodePage } from './view-bar-code';

@NgModule({
  declarations: [
    ViewBarCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewBarCodePage),
  ],
})
export class ViewBarCodePageModule {}
