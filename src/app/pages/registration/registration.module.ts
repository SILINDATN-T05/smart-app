import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ComboDatepickerModule } from 'ngx-combo-datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#0000ff',
      secondaryColour: '#0000ff',
      tertiaryColour: '#0000ff'
    }),
    ComboDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistrationPageModule {}
