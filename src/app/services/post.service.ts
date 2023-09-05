import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timestamp } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Post } from 'src/Models/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

private baseUrl = environment.baseUrl + "/post";

  constructor( private http: HttpClient  ) { }

  createPost(data: Post): Observable<Post> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Post>(this.baseUrl, data, {headers});
  }

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  findById(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + `/${id}`);
  }

  generateTimestampToFrendlyFormat(timeStamp:string){
    const dateOnlyIn8601Format = timeStamp.split('T')[0];
    const dateFormated = `${dateOnlyIn8601Format.split("-")[2]}/${dateOnlyIn8601Format.split("-")[1]}/${dateOnlyIn8601Format.split("-")[0]}`
    
    const time = timeStamp.split('T')[1]
    const timeOnlyWithoutSeconds = `${time.split(':')[0]}:${time.split(':')[1]}`

    return  dateFormated + " as " + timeOnlyWithoutSeconds;
  }
}
