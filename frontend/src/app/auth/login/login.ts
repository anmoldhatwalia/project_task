import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private auth: Auth,
    private router: Router,
    private toastr: ToastrService
  ) { }

  email = '';
  emailTouch = false;
  password = '';

  login() {
    if (!this.email) {
      this.toastr.error('Email is required', 'Error')
      return;
    }

    if (!this.password) {
      this.toastr.error('Password is required', 'Error')
      return;
    }

    if (this.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters', 'Error')
      return;
    }

    const data = {
      email: this.email,
      password: this.password
    }

    this.auth.login(data).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token)
        this.router.navigate([
          '/dashboard'
        ]);

        setTimeout(() => {

          this.toastr.success(
            'Login Successful',
            'Success'
          );

        }, 100);
      },
      error: () => { this.toastr.error('Invalid Email or Password', 'Error'); }
    })


  }
}