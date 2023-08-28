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

  postQuery:string = '';
  postsFiltered:Post[] = [];


  ngOnInit(): void {
    this.loadPosts()
 
  }



  constructor(private postService:PostService, private userService:UserService ){}

   loadPosts():void {

    this.postService.findAll().subscribe( response => {
      this.posts = response 
      this.postsFiltered = response
    });

  }

  formatDate(dateString:string){
    return this.postService.generateTimestampToFrendlyFormat(dateString);
  }

  searchPost(){
    this.postsFiltered = this.posts;
    
    if(this.postQuery.trim() == "") {
      return;
    }

    console.log(this.postQuery);
    

    this.postsFiltered = this.postsFiltered.filter(post => {

      const postInfoInLower = {
        username:post.username?.toLowerCase(),
        title: post.title.toLowerCase(),
        content: post.content.toLowerCase()
      }

      let postQueryInLower = this.postQuery.toLowerCase()

      return postInfoInLower.username!.includes(postQueryInLower) || postInfoInLower.title.includes(postQueryInLower) || postInfoInLower.content.includes(postQueryInLower);
    });
    
  }

}
