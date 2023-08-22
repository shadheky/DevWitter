import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post  } from 'src/Models/Post';
import { Comment  } from 'src/Models/Comment';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { LoginFormService } from 'src/app/services/login-form.service';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  post!:Post;
  commentForm!:FormGroup;

  commentToSend:Comment =  {
    userId:0,
    content:"",
    postId:0
  }

  private methodRequest:String = "post";


  
  constructor(private commentService:CommentsService, private postService:PostService, private activatedRoute:ActivatedRoute,private router:Router, private messageService:MessagesService,private loginFormService:LoginFormService) {}

  


  private commentResquestMethods = {
    post : () => {     
                this.commentToSend.postId = this.post.id;
                this.commentService.create(this.commentToSend).subscribe( response => {
                this.post.comments?.push(response);
                this.messageService.add("Comentário postado com sucesso");
              } );
             
    }

  }




  ngOnInit(): void {
    this.loadPostWithAllComments();

    this.commentForm = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.maxLength(200)])

    })

  }

  get author() {
    return this.commentForm.get('author')
  }

  get content() {
    return this.commentForm.get('content')
  }



   loadPostWithAllComments() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postService.findById(id).subscribe(  response => {
       this.post = response;
   
    } );
  }


  redirectToRequest() {

    if(!localStorage.getItem('token')){
      this.messageService.add("Realize o login para poder comentar");
      return;
    }
      if(this.commentForm.invalid){
        return
      }
      

      this.commentResquestMethods.post();
    
  }


  prepareToCreate() {
   
    this.commentToSend = { userId:0,
    content:"",
    postId:0};
    this.methodRequest = "post"
  }

  formatDate(dateString:string){
    return this.postService.generateTimestampToFrendlyFormat(dateString
      );
  }


}

