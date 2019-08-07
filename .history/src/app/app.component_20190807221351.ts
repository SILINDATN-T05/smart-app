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
      title: 'On Physical',
      url: '/on-physical',
      icon: 'people'
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public serv: AuthService
  ) {
    this.initializeApp();
    this.user = this.serv._user;
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
