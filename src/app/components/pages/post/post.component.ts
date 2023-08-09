import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post  } from 'src/Models/Post';
import { Comment  } from 'src/Models/Comment';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  post!:Post;
  commentForm!:FormGroup;

  commentToSend:Comment =  {
    author:"",
    content:"",
    postId:0
  }

  private methodRequest:String = "post";


  
  constructor(private commentService:CommentsService, private postService:PostService, private activatedRoute:ActivatedRoute,private router:Router, private messageService:MessagesService) {}


  private commentResquestMethods = {
    post : () => {     
              this.commentToSend.postId = this.post.id;
              this.commentService.create(this.commentToSend).subscribe( response => {
                this.post.comments?.push(response);
                this.messageService.add("Comentário postado com sucesso");
              } );
             },
    put : () => {
      this.commentToSend.postId = this.post.id;
      this.commentService.update(this.commentToSend).subscribe( response => {
        this.messageService.add("Comentário editado com sucesso");
        this.post.comments?.push(response);

        this.post.comments = this.post.comments?.filter( comment => comment.id !== this.commentToSend.id);
        this.post.comments?.push(response);

      });
    },

    delete: (id:number) => {
      this.commentService.delete(id).subscribe( response => {
        this.post.comments = this.post.comments!.filter( comment => comment.id !== id );
        this.messageService.add("Comentário apagado");
      } );
    }
  }




  ngOnInit(): void {
    this.loadPostWithAllComments();

    this.commentForm = new FormGroup({
      author: new FormControl("", [Validators.required, Validators.maxLength(75)]),
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

      if(this.commentForm.invalid){
        return
      }
      
     if( this.methodRequest === "put" ){
        this.commentResquestMethods.put();
     }else if(this.methodRequest === "post") {
      this.commentResquestMethods.post();
     }
      
  
  }


  redirectToDelete(id: number){
    this.commentResquestMethods.delete(id);
  }
  

  prepareToUpdate(comment:Comment){ 
    this.commentToSend.id = comment.id;
    this.commentToSend.author = comment.author;
    this.commentToSend.content = comment.content;
    this.methodRequest = "put"
  }


  prepareToCreate() {
    this.commentToSend = { author:"",
    content:"",
    postId:0};
    this.methodRequest = "post"
  }



}
