import { Component, OnInit, Inject } from '@angular/core';
import { ICompany } from 'src/app/shared/models/company.model';
import { IEvaluation } from 'src/app/shared/models/evaluation.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IResponce } from 'src/app/shared/models/response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {

  selected = 'Pre-Employment';
  minDate = new Date();
  company: ICompany;
  evaluation: IEvaluation;
  loadingText = '';
  loading = false;
  isShedule = true;
  isToday = true;

  constructor(
    private toastr: AlertService,
    private formBuilder: FormBuilder,
    private apiServ: AuthService,
    public router: Router,
    private dialogRef: ModalController,
    navParams: NavParams
  ) {
    this.evaluation = navParams.get('evaluation');
    this.isShedule = false;
    this.company = this.evaluation.company;
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.dismiss();
  }
  switchContent() {
    this.isShedule = !this.isShedule;
  }
  evaluateDate(event) {
    this.isToday = moment().format('YYYY/MM/DD') === moment(event.value).format('YYYY/MM/DD');
  }
  createEval(status: string = 'ON-PHYSICAL') {
    const vm = this;
    status = !this.isToday && vm.company.paymentFirst ? 'PAYMENT-REQUIRED' : status;
    vm.loadingText = 'Creating Patient Evaluation, Please wait ...';
    vm.loading = true;
    vm.evaluation.status = status;
    vm.apiServ
      .checkIn({
        query: {id: vm.evaluation.id},
        update: vm.evaluation
      })
      .subscribe((res: IResponce) => {
        vm.loading = false;
        if (res.code === '00') {
          vm.toastr.presentToast(res.msg, 'Update Evaluation');
          vm.dialogRef.dismiss(true);
        } else {
          vm.toastr.presentToast(res.msg, 'Update Evaluation');
          vm.dialogRef.dismiss();
        }
      });
  }

}
