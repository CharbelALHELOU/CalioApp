import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) {}

  name = "Login";
  
  ngOnInit(): void {
   }

  open: boolean = false;

  openMenu = function () {
    this.open = !this.open;
  };

  loggedIn() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
