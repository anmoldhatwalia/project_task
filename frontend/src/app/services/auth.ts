import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http:HttpClient){}

  login(data:any){
    return this.http.post(
      'http://localhost:5000/api/auth/login',data
    )

  }

  signup(data:any){
    return this.http.post(
      'http://localhost:5000/api/auth/signup',data
    )
  }

  getProfile(){
    return this.http.get(
       'http://localhost:5000/api/auth/profile'
    )
  }
  forgotPassword(data:any){

    return this.http.post('http://localhost:5000/api/auth/forgot-password',data);

}

resetPassword(token:string,data:any){

  return this.http.post(`http://localhost:5000/api/auth/reset-password/${token}`,data);
 
}

}
