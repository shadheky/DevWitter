import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'devwitter';
  loginScreenIsShowed:Boolean = false;

  ngOnInit(): void {
    isLoged:Boolean;

    this.loginService.testToken().subscribe(
      res => {
        
      },
      err => {
        localStorage.clear();
      }
    );

  }

  constructor(private loginService:LoginService){}




}
