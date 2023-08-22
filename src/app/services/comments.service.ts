import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Comment } from 'src/Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = environment.baseUrl + "/comment"

  constructor(private http:HttpClient) { }

  create(data: Comment): Observable<Comment> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Comment>(this.baseUrl, data, {headers});
  }

  
 

}
