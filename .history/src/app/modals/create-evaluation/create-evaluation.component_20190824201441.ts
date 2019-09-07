import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { IResponce } from 'src/app/shared/models/response.model';
import { ICompany } from 'src/app/shared/models/company.model';
import { IPatient } from 'src/app/shared/models/patient.model';
import * as moment from 'moment';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss'],
})
export class CreateEvaluationComponent implements OnInit {

  selected = 'Pre-Employment';
  minDate = new Date();
  date = new FormControl(new Date());
  company: ICompany;
  info: { title: string; name: string; patient: IPatient } = {
    title: '',
    name: '',
    patient: null
  };
  loadingText = '';
  loading = false;
  isShedule = true;
  isToday = true;

  constructor(
    private alertServ: AlertService,
    private apiServ: AuthService,
    private modalCtrl: ModalController,
    navParams: NavParams
  ) {
    this.info = {
      title: navParams.get('title'),
      name: navParams.get('name'),
      patient: navParams.get('patient')
    };
    this.company = navParams.get('company');
    console.log(this.info, this.company);
  }

  ngOnInit() {}

  onNoClick(): void {
    this.modalCtrl.dismiss();
  }
  switchContent() {
    this.isShedule = !this.isShedule;
  }
  evaluateDate(event) {
    console.log(event);
    this.isToday = moment().format('YYYY/MM/DD') === moment(event.target.value).format('YYYY/MM/DD');
  }
  createEval(status: string = 'ON-PHYSICAL') {
    const vm = this;
    status = !this.isToday && vm.company.paymentFirst ? 'PAYMENT-REQUIRED' : status;
    vm.loadingText = 'Creating Patient Evaluation, Please wait ...';
    vm.loading = true;
    vm.apiServ
      .createPatientEvaluation({
        patient: vm.info.patient,
        status,
        evaluation: { medicalType: vm.selected, evaluationDate: vm.date.value, status}
      })
      .subscribe((res: IResponce) => {
        vm.loading = false;
        if (res.code === '00') {
          vm.alertServ.presentToast(res.msg, 'Create Evaluation');
          vm.modalCtrl.dismiss(true);
        } else {
          vm.alertServ.presentToast(res.msg, 'Create Evaluation');
          vm.modalCtrl.dismiss();
        }
      });
  }
}
