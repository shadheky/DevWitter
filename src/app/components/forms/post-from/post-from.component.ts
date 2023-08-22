import { Component, OnInit } from '@angular/core';
import { Post } from 'src/Models/Post';
import { PostService } from 'src/app/services/post.service';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { LoginFormService } from 'src/app/services/login-form.service';



@Component({
  selector: 'app-post-from',
  templateUrl: './post-from.component.html',
  styleUrls: ['./post-from.component.css']
})
export class PostFromComponent implements OnInit{

  postToPersit:Post = {
    title:"",
    content:""
  }

  loginFormIsShowed:boolean = false;


  ngOnInit(): void {
    
  }
  postFormGroup:FormGroup = new FormGroup({
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

  constructor(private postService:PostService, private router:Router, private messageService:MessagesService, private loginFormService:LoginFormService){  }


  createPost(){

    
    if(localStorage.getItem('token') === null){
   
      this.loginFormService.showLoginScreen();
      this.messageService.add("Realize o login para publicar");
      return;
    }

    if(this.postFormGroup.invalid){
      return;
    }

    this.postService.createPost(this.postToPersit).subscribe( response => {
      this.router.navigate(['/']);
      this.messageService.add("Post Publicado");
    } );
  }

  

}
