import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotAuthorisedPage } from './not-authorised.page';

const routes: Routes = [
  {
    path: '',
    component: NotAuthorisedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotAuthorisedPage]
})
export class NotAuthorisedPageModule {}
