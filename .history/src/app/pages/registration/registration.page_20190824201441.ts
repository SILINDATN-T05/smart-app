import { Component, OnInit } from '@angular/core';
import { IResponce } from 'src/app/shared/models/response.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CreateEvaluationComponent } from 'src/app/modals/create-evaluation/create-evaluation.component';
import { Validators, ValidatorFn, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateCompanyComponent } from 'src/app/modals/create-company/create-company.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
})
export class RegistrationPage implements OnInit {
  isLoading = false;
  isReissue = false;
  isRefresh = false;
  idValue: any;
  identity: string;
  minLength: number;
  type: string;
  patientForm: FormGroup;
  companies: any;
  company: any;
  today = new Date();

  constructor(
    private alertServ: AlertService,
    private router: Router,
    private request: AuthService,
    private formBuilder: FormBuilder,
    public modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.getCompanies();
  }
  createPatientFile(form) {
    const vm = this;
    vm.isLoading = true;
    vm.patientForm.patchValue({ fullName: vm.patientForm.value.surname + ' ' + vm.patientForm.value.firstName });

    vm.request.createPatientFile(vm.patientForm.value).subscribe((res: IResponce) => {
      vm.isLoading = false;
      if (res.code === '00') {
        vm.alertServ.presentToast(res.msg, 'Register Patient');
      } else {
        vm.alertServ.presentToast(res.msg, 'Register Patient');
      }
      vm.openConfirmationDialog(res);
    });
  }

  changeSelect(value) {
    this.idValue = value;
    if (value === 'IDNumber') {
      this.identity = 'Id Number';
      this.minLength = 13;
      this.type = 'number';
    } else if (value === 'PermitNumber') {
      this.identity = 'Work Permit Number';
      this.minLength = 6;
      this.type = 'text';
    } else {
      this.identity = 'Passport Number';
      this.minLength = 6;
      this.type = 'text';
    }
    this.patientForm.get('IdValue').updateValueAndValidity();
  }

  getCompanies() {
    const vm = this;
    vm.request.getCompanies({}).subscribe((res: IResponce) => {
      if (res.code === '00') {
        vm.companies = res.detail;
      }
    });
  }

  async addCompany(value) {
    const vm = this;
    console.log(value);
    if (value === '0') {
      const modal = await this.modalController.create({
        component: CreateCompanyComponent
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      vm.getCompanies();
      if (data) {
        vm.patientForm.patchValue({ companyId: data.id });
      } else {
        vm.patientForm.value.companyId = '';
      }
    } else {
      this.company = this.companies.find(c => c.id === value);
    }
  }

  async openConfirmationDialog(data: IResponce) {
    const vm = this;
    if (data.code !== '01') {
      const modal = await this.modalController.create({
        component: CreateEvaluationComponent,
        componentProps: {
          patient: data.detail,
          name: vm.patientForm.value.fullName,
          company: vm.company,
          title: 'New Patient record created'
        }
      });
      await modal.present();
      await modal.onWillDismiss();
      vm.router.navigate(['/scheduled']);
    }
  }

  private createForm() {
    this.patientForm = this.formBuilder.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      fullName: [''],
      companyId: ['', Validators.required],
      mobileNumber: ['', Validators.pattern(/^-?(0|[0-9]\d*)?$/)],
      email: [
        '',
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ],
      title: ['Mr', Validators.required],
      maritalStatus: ['Single', Validators.required],
      initials: ['', Validators.required],
      idType: ['IDNumber', Validators.required],
      IdValue: ['', Validators.compose([Validators.required, this.IdValidater(this.idValue, 6)])],
      dob: ['', Validators.required],
      position: [''],
      department: ['']
    });
  }

  IdValidater(type: string, min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control) {
        return { idValue: true };
      } else {
        // tslint:disable-next-line:max-line-length
        const isValid = /(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/.test(
          control.value
        );
        if (control.value !== undefined && this.idValue === 'IDNumber' && !isValid && (isNaN(control.value) || control.value.length < 13)) {
          // console.log(control);
          return { idValue: true };
        } else if (control.value !== undefined && control.value.length < min) {
          return { idValue: true };
        }
      }
      return null;
    };
  }

  login(form) {
    this.isLoading = true;
    this.isReissue = false;
    this.isRefresh = false;
    const vm = this;
    this.request.loginApp(form.form.value).subscribe(
      (res: IResponce) => {
        if (res.code === '00') {
          vm.router.navigate(['/scheduled']);
        } else {
          vm.alertServ.presentToast(
            'You have entered invalid login Credentials. Please try again later or Contact your system administrator.',
            'ERROR'
          );
        }
        vm.isLoading = false;
      },
      () => {
        vm.isLoading = false;
        vm.alertServ.presentToast(
          'Technical error occured. Please try again later or Contact your system administrator.',
          'ERROR'
        );
      }
    );
  }
}
