import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { mapToExpression } from '../../../node_modules/@angular/compiler/src/render3/view/util';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login( model: any ) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map( (res: any) => {
        const user = res;
        if (user) { localStorage.setItem('token', user.token); }
      }
    ));
  }

  register( model: any ) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
