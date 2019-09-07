import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IResponce } from 'src/app/shared/models/response.model';
import { IEvaluation } from 'src/app/shared/models/evaluation.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ModalController } from '@ionic/angular';
import { CheckInComponent } from 'src/app/modals/check-in/check-in.component';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.page.html',
  styleUrls: ['./scheduled.page.scss'],
})
export class ScheduledPage implements OnInit {

  evaluations: IEvaluation[] = [];
  isPatients = false;
  isLoading = false;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; } = {totalItems: 0, itemsPerPage: 5, currentPage: 1};
  constructor(private serv: AuthService,
              private toastr: AlertService,
              public modalController: ModalController) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.evaluations.length
    };
  }


  ngOnInit() {
    this.getEvaluations();
  }

  getEvaluations() {
    const vm = this;
    vm.isLoading = true;
    vm.serv.getScheduled().subscribe((res: IResponce) => {
      if (res.code === '00') {
        vm.evaluations = res.detail;
        vm.config.totalItems = vm.evaluations.length;
        vm.isPatients = vm.evaluations.length > 0;
      }
      vm.isLoading = false;
    }, () => {
      vm.isLoading = false;
    });
  }

  checkIn(id, name) {
    const data = {
      update: { checkIn: true },
      query: { id }
    };
    const vm = this;
    vm.isLoading = true;
    vm.serv.patientsCheckIn(data).subscribe(
      (res: IResponce) => {
        if (res.code === '00') {
          vm.toastr.presentToast(res.msg, name + ' Check In');
          vm.getEvaluations();
        } else {
          vm.toastr.presentToast(res.msg, name + ' Check In');
        }
        vm.isLoading = false;
      },
      error => {
        vm.isLoading = false;
      }
    );
  }

  async takePayment(evaluation) {
    const modal = await this.modalController.create({
      component: CheckInComponent,
      componentProps: {
        evaluation
      }
    });
    await modal.onWillDismiss();
    this.getEvaluations();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
