import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IResponce } from 'src/app/shared/models/response.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
})
export class CreateCompanyComponent implements OnInit {

  companyForm: FormGroup;
  isLoading = false;
  constructor(
    private alertServ: AlertService,
    private formBuilder: FormBuilder,
    private apiServ: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createCompany() {
    const vm = this;
    vm.isLoading = true;
    vm.apiServ.createCompany(vm.companyForm.value).subscribe((res: IResponce) => {
      console.log(res);
      vm.isLoading = false;
      if (res.code === '00') {
        vm.alertServ.presentToast('Company successfully added!!!', 'Add Company');
        vm.modalCtrl.dismiss(res.detail);
      } else if (res.code === '02') {
        vm.alertServ.presentToast(res.msg, 'Add Company');
        vm.modalCtrl.dismiss(res.detail);
      } else {
        vm.alertServ.presentToast(res.msg, 'Add Company');
      }
    }, (error) => {
      vm.isLoading = false;
    });
  }

  onNoClick(): void {
    this.modalCtrl.dismiss();
  }

  private createForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: [''],
      fax: [''],
      email: ['', Validators.email],
      paymentFirst: [true]
    });
  }
}
