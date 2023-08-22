import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Models/User';
import { environment } from 'src/environments/environment.development';
import { Token } from 'src/Models/Token';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  isShowed:boolean = false;

  private baseUrl:string = environment.baseUrl + "/auth";

  constructor (private router:Router,private http:HttpClient) {}

  authorize(user:User): Observable<Token>{
    return this.http.post<Token>(this.baseUrl, user);
  }

  testToken(): Observable<void>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<void>(this.baseUrl, {headers});
  }







}
