import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Post } from 'src/Models/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

private baseUrl = environment.baseUrl + "/post";

  constructor( private http: HttpClient ) { }

  createPost(data: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, data);
  }

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + `/${id}`);
  }

}
