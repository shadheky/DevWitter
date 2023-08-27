import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'src/Models/User';
import { LoginFormService } from 'src/app/services/login-form.service';
import { LoginService } from 'src/app/services/login.service';
import { MessagesService } from 'src/app/services/messages.service';


@Component({
  selector: 'app-login-scren',
  templateUrl: './login-scren.component.html',
  styleUrls: ['./login-scren.component.css']
})
export class LoginScrenComponent {

  constructor(public loginFormService:LoginFormService, private messageService:MessagesService, private loginService:LoginService) { }

  userToAutorize:User = {
      username:"",
      password:""
  }
  clicked:boolean = false

  loginFormGroup:FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  get password(){
    return this.loginFormGroup.get('password')
  }

  get username(){
    return this.loginFormGroup.get('username')
  }

  autorize():void{
    if(this.loginFormGroup.invalid) {
      return;
    }
    
    this.clicked = true;

    this.userToAutorize.password = this.userToAutorize.password.trim();
    this.userToAutorize.username = this.userToAutorize.username.trim();


    this.loginService.authorize(this.userToAutorize).subscribe(
      res => {
      
        
        localStorage.setItem('token', res.accsessToken);
        localStorage.setItem('username', this.userToAutorize.username);

        
    
        this.loginFormService.hideLoginScreenAndBackToHome();
        this.messageService.add('Logado com sucesso')
        this.clicked = false;
      },
      err => {
        this.messageService.add(err.error.Error);
        this.clicked = false;
      }
    )
   
  }


}
