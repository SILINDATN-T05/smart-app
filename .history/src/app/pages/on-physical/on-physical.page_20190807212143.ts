import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-physical',
  templateUrl: './on-physical.page.html',
  styleUrls: ['./on-physical.page.scss'],
})
export class OnPhysicalPage implements OnInit {
  patients: any[] = [];
  isPatients = false;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; } = {totalItems: 0, itemsPerPage: 5, currentPage: 1};
  constructor() {
    for (let i = 0; i < 30; i++) {
      this.patients.push(
        {
          id: i + 1,
          fullName: 'items no. ' + (i + 1),
          IdValue: 9111135399083,
          medicalType: 'Ex... ' + i,
          company: 'Company ' + (i + 1)
        }
      );
    }

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.patients.length
    };
  }


  ngOnInit() {
    console.log(this.patients);
    this.isPatients = this.patients.length > 0;
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
