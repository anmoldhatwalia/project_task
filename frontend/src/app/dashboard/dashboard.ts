import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Navbar } from "../shared/navbar/navbar";
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [Navbar,JsonPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
profile: any = null;
loading = false;

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {

    this.auth
      .getProfile()
      .subscribe({
        next: (res:any) => {

          setTimeout(()=>{

            this.profile = res;
            console.log(res)
            
            this.loading= false;
          })

        },
        error: () => {

          this.loading = false;
        }
      });

  }
}
