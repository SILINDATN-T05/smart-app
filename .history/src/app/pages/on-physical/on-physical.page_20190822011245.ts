import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IResponce } from 'src/app/shared/models/response.model';
import { IEvaluation } from 'src/app/shared/models/evaluation.model';

@Component({
  selector: 'app-on-physical',
  templateUrl: './on-physical.page.html',
  styleUrls: ['./on-physical.page.scss'],
})
export class OnPhysicalPage implements OnInit {
  evaluations: IEvaluation[] = [];
  isPatients = false;
  isLoading = false;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; } = {totalItems: 0, itemsPerPage: 5, currentPage: 1};
  constructor(private serv: AuthService) {
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
    vm.serv.getOnPhysical().subscribe((res: IResponce) => {
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

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
