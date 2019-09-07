import { Component, OnInit } from '@angular/core';
import { IEvaluation } from 'src/app/shared/models/evaluation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalController } from '@ionic/angular';
import { IResponce } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-quetionare',
  templateUrl: './quetionare.page.html',
  styleUrls: ['./quetionare.page.scss']
})
export class QuetionarePage implements OnInit {
  evaluation: IEvaluation;
  loading = false;
  questions = [
    {
      Question: 'Do you suffer from heart disease or high blood pressure?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Do you suffer from epilepsy or convulsions?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Do you suffer from glaucoma or blindness?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Do you have family Mellitus (Sugar sickness)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you had any family members deaths before reaching 60 years of age?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever been refused life insurance?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever been refused a driving licence?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever been admitted to hospital(for any reason)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever been a smoker?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have frequent or severe headaches?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have dizziness or unsteadiness?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever been unconsiousness(for any reason)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have a head injury or concussion?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have epilepsy or fits of any kind?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any other neurological disorder?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any mental/Psychological disorder?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any eye or vision trouble(except for glasses)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any hearing or speech disorders',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever had or do you now have hay fever or allergies?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have asthma or any lung disease?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have a collapsed lung(pneumonia)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any bleeding from the rectum?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any kidney stones or blood in the urine (including Bilharzia)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any sugar or protein in the urine?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any prostate/Gynaecological problems?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any blood or thyroid disorder?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any malignant tumours, cancer or radiotherapy?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any weight loss(without dieting)?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have a sexually transmitted disease?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any 0ther illness or injuries',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any allergies : Penicillin etc.?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any back problems ,joint or bone disease?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any varicose veins or piles?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever had or do you now have any skin disease?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever had or do you now have any physical abnormalities?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever had  any surgical operations done?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Have you ever abused or do you currently abuse alcohol?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever abused or do you currently abuse drugs or substances?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question:
        'Have you ever abused or do you currently abuse any medication?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Does your occupation result in asbestos exposure?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Does your oppupation involve andy mine or underground work?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Does your occupation result in chemical exposure?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Comments',
      QuestionResponseType: 'text',
      Section: 'Medical History Comments',
      QuestionResponse: ''
    },
    {
      Question:
        'Do you hereby declare that the above information is correct and I have not provided any misleading information to the company?',
      QuestionResponseType: 'check',
      Section: 'Medical History',
      QuestionResponse: false
    },
    {
      Question: 'Height',
      QuestionResponseType: 'number',
      Section: 'Medical Examination',
      QuestionResponse: 0
    },
    {
      Question: 'Weight',
      QuestionResponseType: 'number',
      Section: 'Medical Examination',
      QuestionResponse: 0
    },
    {
      Question: 'BMI',
      QuestionResponseType: 'number',
      Section: 'Medical Examination',
      QuestionResponse: 0
    },
    {
      Question: 'Has the weight changed by more than 5kg in the past year?',
      QuestionResponseType: 'check',
      Section: 'Medical Examination',
      QuestionResponse: false
    },
    {
      Question: 'If yes, state a reason for the weight change.',
      QuestionResponseType: 'text',
      Section: 'Medical Examination',
      QuestionResponse: ''
    },
    {
      Question: 'Pulse: Rate per minute',
      QuestionResponseType: 'number',
      Section: 'Medical Examination',
      QuestionResponse: 0
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: AlertService,
    private apiServ: AuthService,
    private dialogRef: ModalController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.evaluation = this.router.getCurrentNavigation().extras.state.evaluation;
      }
    });
  }

  ngOnInit() {
  }

  onSave() {
    const vm = this;
    vm.loading = true;
    const data = {
      update: { status: 'ON-TECHNICAL', questions: vm.questions },
      query: { id: vm.evaluation.id }
    };
    vm.apiServ.checkIn(data).subscribe((res: IResponce) => {
      if (res.code === '00') {
        vm.toastr.presentToast(res.msg, 'Update Evaluation');
      } else {
        vm.toastr.presentToast(res.msg, 'Update Evaluation');
      }
      vm.loading = false;
      vm.router.navigate(['../']);
    });
  }
}
