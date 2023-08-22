import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Models/User';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseUrl:string = environment.baseUrl + "/user";

  createUser(user:User):Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  findById(id:number):Observable<User> {
    return this.http.get<User>(this.baseUrl + `/${id}`);
  }

}
