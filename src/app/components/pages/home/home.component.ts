import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private postService:PostService, private userService:UserService ){}

  loadPosts():void {

    this.postService.findAll().subscribe( response => {
      this.posts = response 
    });

  }

  formatDate(dateString:string){
    return this.postService.generateTimestampToFrendlyFormat(dateString);
  }

}
