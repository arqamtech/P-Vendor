import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorBannerPage } from './vendor-banner';

@NgModule({
  declarations: [
    VendorBannerPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorBannerPage),
  ],
})
export class VendorBannerPageModule {}
