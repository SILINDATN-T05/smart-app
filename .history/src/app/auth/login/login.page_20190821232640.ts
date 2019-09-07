import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IResponce } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  isReissue = false;
  isRefresh = false;

  constructor(private alertServ: AlertService, private router: Router, private request: AuthService) {
    this.request.createSession();
  }

  ngOnInit() {
  }

  login(form) {

    this.isLoading = true;
    this.isReissue = false;
    this.isRefresh = false;
    const vm = this;
    this.request.loginApp(form.form.value).subscribe((res: IResponce) => {
      if (res.code === '00') {
        vm.request.user = res.data.user;
        vm.request.permissions = res.data.permissions;
        vm.request.isLoggedIn = true;
        vm.router.navigate(['/scheduled']);
      } else {
        vm.alertServ.presentToast(
          'You have entered invalid login Credentials. Please try again later or Contact your system administrator.',
          'ERROR'
        );
      }
      vm.isLoading = false;
    }, () => {
      vm.isLoading = false;
      vm.alertServ.presentToast(
        'Technical error occured. Please try again later or Contact your system administrator.',
        'ERROR'
      );
    });
  }

}
