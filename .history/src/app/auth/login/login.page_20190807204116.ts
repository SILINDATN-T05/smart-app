import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  isReissue = false;
  isRefresh = false;

  constructor(private alertServ: AlertService,private router: Router,private request: AuthService) { 
    this.request.createSession();
  }

  ngOnInit() {
  }

  login(form){
    console.log(form.form.value);
    // this.authService.login(form.value).subscribe((res)=>{
    //   this.router.navigateByUrl('home');
    // });
    // this.authService.login(form.value.email, form.value.password).subscribe(
    //   data => {
    //     this.alertService.presentToast("Logged In");
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     this.dismissLogin();
    //     this.navCtrl.navigateRoot('/dashboard');
    //   }
    // );

    this.isLoading = true;
    this.isReissue = false;
    this.isRefresh = false;
    const vm = this;
    this.request.loginApp(form.form.value).subscribe(res => {
      if (res['code'] === '00') {
        vm.request._user = res['data']['user'];
        vm.request.permissions = res['data']['permissions'];
        vm.request.isLoggedIn = true;
        vm.router.navigate(['/on-physical']);
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
