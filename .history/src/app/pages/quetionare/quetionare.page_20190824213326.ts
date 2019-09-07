import { Component, OnInit } from '@angular/core';
import { IEvaluation } from 'src/app/shared/models/evaluation.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quetionare',
  templateUrl: './quetionare.page.html',
  styleUrls: ['./quetionare.page.scss']
})
export class QuetionarePage implements OnInit {
  evaluation: IEvaluation;
  questions = [];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.evaluation = this.router.getCurrentNavigation().extras.state.evaluation;
      }
    });
  }

  ngOnInit() {
    console.log(this.evaluation);
  }
}
