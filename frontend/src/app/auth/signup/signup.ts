import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router,RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private auth:Auth,
    private router :Router,
    private toastr:ToastrService
  ){}

  name='';
  email='';
  emailTouch=false;
  password='';
  confirmPassword='';

  signup(){
     if (!this.name) {
      this.toastr.error('Name is required','Error')
    return;
  }

  if (!this.email) {
    this.toastr.error('Email is required','Error')
    return;
  }

  if (!this.password) {
    this.toastr.error('Password is requried','Error')
    return;
  }

  if (this.password.length < 6) {
    this.toastr.error('Password must be at least 6 characters','Error')
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.toastr.error('Password is not Matched')
    return;
  }


    const data = {
      name :this.name,
      email :this.email,
      password:this.password

    };

    this.auth.signup(data).subscribe({next:()=>{
      this.toastr.success('Account Created Successfully','Success')
      this.router.navigate(['/login'])
    },
    error:(err)=>{
      console.log(err)
    }
    
  

    });

  }


}
