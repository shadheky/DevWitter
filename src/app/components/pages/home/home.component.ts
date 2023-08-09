import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    
  posts!:Post[];


  ngOnInit(): void {
    this.loadPosts()
  
    
  }

  constructor(private postService:PostService){}

  loadPosts():void {

    this.postService.findAll().subscribe( response => {
      this.posts = response;
    });

  }

}
