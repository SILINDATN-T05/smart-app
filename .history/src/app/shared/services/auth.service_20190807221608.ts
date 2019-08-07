import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { EnvService } from "./env.service";
import { User } from "../models/user.model";
import { Router } from '@angular/router';
@Injectable({
  providedIn: "root"
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
    return this.http.post(this.env.API_URL + "/api/service", data);
  }
  logout() {
    this.storage.remove("token");
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  getToken() {
    return this.storage.getItem("token").then(
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
    this.http.post(this.env.API_URL + "/api/createSession/", this.env.body).subscribe(res => {
      this.storage.setItem("token", res["token"]).then(
        () => {
          console.log("Token Stored");
        },
        error => console.error("Error storing item", error)
      );
      this.token = res["token"];
    });
  }
  getEvaluations(data) {
    return this.http.post(this.env.API_URL + '/api/patient/evaluations', data);
  }
}
