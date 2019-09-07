import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Patient Registration',
      url: '/registration',
      icon: 'document'
    },
    {
      title: 'On Physical',
      url: '/on-physical',
      icon: 'people'
    },
    {
      title: 'Scheduled',
      url: '/scheduled',
      icon: 'time'
    },
    // {
    //   title: 'Not Auth',
    //   url: '/not-authorised',
    //   icon: 'people'
    // },
    {
      title: 'Log Out',
      url: 'logout',
      icon: 'log-out'
    }
  ];
  user: User = null;
  isLoggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public serv: AuthService
  ) {
    this.initializeApp();
    if (this.serv.isLoggedIn) {
      this.user = this.serv.user;
      this.isLoggedIn = this.serv.isLoggedIn;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.serv.logout();
  }
}
