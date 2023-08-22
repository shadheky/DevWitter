import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Models/User';
import { environment } from 'src/environments/environment.development';
import { Token } from 'src/Models/Token';


@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  
  isShowed:boolean = false;

  private baseUrl:string = environment.baseUrl + "/auth";

  constructor (private router:Router,private http:HttpClient) {}

  showLoginScreen():void {
    this.isShowed = true;
  }
  hideLoginScreen():void {
    this.isShowed = false;
    
  }
  hideLoginScreenAndBackToHome():void {
    this.isShowed = false;
    this.router.navigate(['/']);
    
  }






}
