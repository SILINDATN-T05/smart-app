import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IResponce } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-on-physical',
  templateUrl: './on-physical.page.html',
  styleUrls: ['./on-physical.page.scss'],
})
export class OnPhysicalPage implements OnInit {
  patients: any[] = [];
  isPatients = false;
  isLoading = false;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; } = {totalItems: 0, itemsPerPage: 5, currentPage: 1};
  constructor(private serv: AuthService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.patients.length
    };
  }


  ngOnInit() {
    this.getEvaluations();
  }

  getEvaluations() {
    const vm = this;
    vm.isLoading = true;
    vm.serv.getEvaluations({query: {status: 'OPEN'}}).subscribe((res: IResponce) => {
      if (res.code === '00') {
        vm.patients = res.detail;
        vm.isPatients = vm.patients.length > 0;
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
