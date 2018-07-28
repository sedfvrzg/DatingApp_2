import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { mapToExpression } from '../../../node_modules/@angular/compiler/src/render3/view/util';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.apiUrl + 'auth/';
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login( model: any ) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map( (res: any) => {
        const user = res;
        if (user) { 
          localStorage.setItem('token', user.token); 
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      }
    ));
  }

  register( model: any ) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
