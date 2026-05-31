import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email='';

  constructor(private auth:Auth,
    private toastr:ToastrService
  ){}

   sendLink(){

  if(!this.email){

    this.toastr.error(
      'Email Required'
    );

    return;
  }

  this.auth
      .forgotPassword({
        email:this.email
      })
      .subscribe({

        next:()=>{

          this.toastr.success(
            'Reset Link Sent'
          );

        },

        error:()=>{

          this.toastr.error(
            'some this is happended','Error'
          );

        }

      });

 }

}
