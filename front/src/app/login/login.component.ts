import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  clicked: Boolean;
  routerSub: Subscription;
  currentDate = new Date();

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSub = this.activatedRoute.paramMap.subscribe((params) => {
      this.clicked = params.get('action') === 'signup';
    });
  }

  onLogin(loginForm: NgForm) {
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.router.navigate(['/']);
        }
        console.log(res);
      });
  }

  flip() {
    this.clicked = !this.clicked;
  }
}
