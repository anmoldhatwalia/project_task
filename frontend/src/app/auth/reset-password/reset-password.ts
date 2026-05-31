import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
 password='';
 confirmPassword='';
 token='';

 constructor(

  private route:
  ActivatedRoute,

  private auth:
  Auth,

  private toastr:
  ToastrService,

  private router:
  Router

 ){

  this.token =
  this.route.snapshot
  .params['token'];

 }

 resetPassword(){

    if (!this.password) {
      this.toastr.error('Password is required','Error')
      return;
    }

  if(this.password.length<6){
    this.toastr.error('Password must be at least 6 characters','Error')
      return;
  }

if (this.password !== this.confirmPassword) {
    this.toastr.error('Password is not Matched')
    return;
  }

  
  this.auth
      .resetPassword(

        this.token,

        {
          password:
          this.password
        }

      )
      .subscribe({

        next:()=>{

          this.toastr.success(
            'Password Reset Successful'
          );

          this.router.navigate([
            '/login'
          ]);

        },

        error:(err)=>{

          this.toastr.error(
            err.error.message
          );

        }

      });

 }

}
