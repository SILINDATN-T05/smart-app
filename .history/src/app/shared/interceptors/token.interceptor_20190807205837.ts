import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public toast: AlertService,
    private storage: NativeStorage
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
            token: `${token}`,
            'x-access-token': `${token}`,
            Authorization: `bearer ${token}`,
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            this.toast.presentToast('you have enter invalid/ incorrect Credentials, Please try again!!!', 'Login Error');
            this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
