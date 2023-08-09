import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<Comment>(this.baseUrl, data);
  }

  update(data:Comment): Observable<Comment> {
    return this.http.put<Comment>(this.baseUrl, data);
  }

  delete(id:number):Observable<void> {
     return this.http.delete<void>(this.baseUrl + "/" + id);
  }

}
