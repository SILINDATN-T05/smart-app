import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastController: ToastController) { }
  async presentToast(message: any, title: any = 'NOTE') {
    const toast = await this.toastController.create({
      message,
      header: title,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }
}
