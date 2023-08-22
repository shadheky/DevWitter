import { Component } from '@angular/core';
import { User } from 'src/Models/User';
import { LoginFormService } from 'src/app/services/login-form.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public loginFormService:LoginFormService, private userService:UserService, private messageService:MessagesService, private router:Router ) {}

  isNotLoged():boolean {
    return localStorage.getItem('token') === null;
  }

  


}
