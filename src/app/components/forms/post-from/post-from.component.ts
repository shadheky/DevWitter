import { Component } from '@angular/core';
import { Post } from 'src/Models/Post';
import { PostService } from 'src/app/services/post.service';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';



@Component({
  selector: 'app-post-from',
  templateUrl: './post-from.component.html',
  styleUrls: ['./post-from.component.css']
})
export class PostFromComponent {

  postToPersit:Post = {
    author:"",
    title:"",
    content:"",
    comments:[]
  }

  postFormGroup:FormGroup = new FormGroup({
    author: new FormControl("", [Validators.required, Validators.maxLength(80)]),
    title: new FormControl("",[Validators.required, Validators.maxLength(250)]),
    content: new FormControl("",[Validators.required, Validators.maxLength(250)])
  })

  get author(){
    return this.postFormGroup.get("author");
  }

  get title(){
    return this.postFormGroup.get("title");
  }

  get content(){
    return this.postFormGroup.get("content");
  }

  constructor(private postService:PostService, private router:Router, private messageService:MessagesService){  }


  createPost(){
    if(this.postFormGroup.invalid){
      return;
    }

    this.postService.createPost(this.postToPersit).subscribe( response => {
      this.router.navigate(['/']);
      this.messageService.add("Post Publicado");
    } );
  }

  

}
