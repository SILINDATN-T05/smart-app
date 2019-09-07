import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user: User = null;
  permissions: any[] = [];
  token: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService
  ) {}
  loginApp(data: any) {
    return this.http.post(this.env.API_URL + '/api/service', data);
  }
  logout() {
    this.storage.remove('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
  createSession() {
    this.http.post(this.env.API_URL + '/api/createSession/', this.env.body).subscribe((res) => {
      // tslint:disable-next-line:no-string-literal
      this.storage.setItem('token', res['token']).then(
        () => {
          console.log('Token Stored');
        },
        error => console.error('Error storing item', error)
      );
      // tslint:disable-next-line:no-string-literal
      this.token = res['token'];
    });
  }
  getEvaluations(data) {
    return this.http.post(this.env.API_URL + '/api/patient/evaluations', data);
  }
  // users api(s)
  getUsers(data) {
    return this.http.post(this.env.API_URL + '/api/user/list_all', data);
  }
  createUser(data) {
    return this.http.post(this.env.API_URL + '/api/user/create', data);
  }
  updateUser(data) {
    return this.http.post(this.env.API_URL + '/api/user/updated_user', data);
  }
  activateUser(data) {
    return this.http.post(this.env.API_URL + '/api/user/activate', data);
  }
  updateUsername(data) {
    return this.http.post(this.env.API_URL + '/api/user/change_username', data);
  }
  deactivateUser(data) {
    return this.http.post(this.env.API_URL + '/api/user/deactivate', data);
  }
  invokeAssignRole(data) {
    return this.http.post(this.env.API_URL + '/api/user/updated_user_role', data);
  }
  deleteUser(id: any) {
    return this.http.delete(this.env.API_URL + '/api/user/delete_user/' + id);
  }
  reissuePassword(data) {
    return this.http.post(this.env.API_URL + '/api/user/reissue_user_password', data);
  }

  // systems api(s)
  runTrasaction(data) {
    return this.http.post(this.env.API_URL + '/api/transaction/', data);
  }
  getRoles(data) {
    return this.http.post(this.env.API_URL + '/api/role/list_all', data);
  }
  createRole(data) {
    return this.http.post(this.env.API_URL + '/api/role/create', data);
  }
  updateRole(data) {
    return this.http.post(this.env.API_URL + '/api/role/edit', data);
  }
  updateRolePermission(data) {
    return this.http.post(this.env.API_URL + '/api/role/updated_role_permission', data);
  }

  getPermitions(data) {
    return this.http.post(this.env.API_URL + '/api/permission/list_all', data);
  }
  createPermission(data) {
    return this.http.post(this.env.API_URL + '/api/permission/create', data);
  }
  updatePermission(data) {
    return this.http.post(this.env.API_URL + '/api/permission/edit', data);
  }

  getApplications(data) {
    return this.http.post(this.env.API_URL + '/api/application/list_all', data);
  }
  createApplication(data) {
    return this.http.post(this.env.API_URL + '/api/application/create', data);
  }
  updateApplication(data) {
    return this.http.post(this.env.API_URL + '/api/application/edit', data);
  }
  updateApplicationPermission(data) {
    return this.http.post(this.env.API_URL + '/api/application/updated_application_permission', data);
  }

  getConfigs(data) {
    return this.http.post(this.env.API_URL + '/api/user/list_config', data);
  }
  createConfig(data) {
    return this.http.post(this.env.API_URL + '/api/user/create_config', data);
  }
  updateConfig(data) {
    return this.http.post(this.env.API_URL + '/api/user/update_config', data);
  }

  // patients api(S)
  getRegisteredPatients() {
    return this.http.get(this.env.API_URL + '/api/patient/registered');
  }
  getScheduled() {
    return this.http.get('/api/patient/get-scheduled');
  }
  getPaymentRequired() {
    return this.http.get('/api/patient/get-payment-required');
  }
  getOnPhysical() {
    return this.http.get('/api/patient/get-on-physical');
  }
  getOnTechnical() {
    return this.http.get('/api/patient/get-on-technical');
  }
  getCompleted() {
    return this.http.get('/api/patient/get-completed');
  }
  getCertIssued() {
    return this.http.get('/api/patient/get-cert-issued');
  }
  patientsCheckIn(data) {
    return this.http.post('/api/patient/check-in', data);
  }
  getPatients(data: any = {}) {
    return this.http.post(this.env.API_URL + '/api/patient/by_query', { query: data });
  }
  createPatientFile(data: any) {
    return this.http.post(this.env.API_URL + '/api/patient/create', { patient: data });
  }
  updatePatientFile(data: any) {
    return this.http.post(this.env.API_URL + '/api/patient/update', { patient: data });
  }
  createPatientEvaluation(data: any) {
    return this.http.post(this.env.API_URL + '/api/patient/evaluate', data);
  }
  getExcelData() {
    return this.http.get(this.env.API_URL + '/api/count/excel-to-json');
  }
  getTotals() {
    return this.http.get(this.env.API_URL + '/api/patient/counter');
  }
  getDocuments() {
    return this.http.get(this.env.API_URL + '/api/count/file/info');
  }
  getDocument(id) {
    return this.http.get(this.env.API_URL + '/api/count/file/' + id);
  }
  uploadDocument(data) {
    return this.http.post(this.env.API_URL + '/api/count/file/upload', data);
  }

  createCompany(data) {
    return this.http.post(this.env.API_URL + '/api/company/create', { company: data });
  }

  updateCompany(data) {
    return this.http.post(this.env.API_URL + '/api/company/update', { company: data });
  }

  getCompanies(data) {
    return this.http.post(this.env.API_URL + '/api/company/by_query', { query: data });
  }
}
