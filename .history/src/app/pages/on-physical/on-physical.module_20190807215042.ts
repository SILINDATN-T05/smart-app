import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnPhysicalPage } from './on-physical.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

const routes: Routes = [
  {
    path: '',
    component: OnPhysicalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#0000ff',
      secondaryColour: '#0000ff',
      tertiaryColour: '#0000ff'
    }),
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnPhysicalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnPhysicalPageModule {}
