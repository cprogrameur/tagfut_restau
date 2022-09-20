import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();

    //Check for url. If it is login url then return    
    if (request.url.includes('/api/auth/')) {
       return next.handle(request);
    }
    if(!authToken) { // <--- not logged-in skip adding the header
      return next.handle(request);
    }
    request = request.clone({
        setHeaders: {
            Authorization: `${this.auth.getToken()}`
        }
    })
    ;
    return next.handle(request);
}
}
