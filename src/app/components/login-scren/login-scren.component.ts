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
  isSend:boolean = false;
  passwordIsShowed:boolean = false;
  passwordInputType:string = 'password'
  passwordEyeIcon:string = 'bi-eye-fill';

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
    
    this.isSend = true;

    this.userToAutorize.password = this.userToAutorize.password.trim();
    this.userToAutorize.username = this.userToAutorize.username.trim();


    this.loginService.authorize(this.userToAutorize).subscribe(
      res => {
      
        
        localStorage.setItem('token', res.accsessToken);
        localStorage.setItem('username', this.userToAutorize.username);

        
    
        this.loginFormService.hideLoginScreenAndBackToHome();
        this.messageService.add('Logado com sucesso')
        this.isSend = false;
      },
      err => {
        this.messageService.add(err.error.Error);
        this.isSend = false;
      }
    )
   
  }

  changeCurrentPasswordInput():void {
    if(this.passwordIsShowed) {
      this.passwordInputType = 'text';
      return
    }
    this.passwordInputType = 'password'
    
  }

  changeCurrentEyePasswordIcon():void {
    this.passwordEyeIcon = (this.passwordEyeIcon === "bi-eye-fill") ? "bi-eye-slash-fill" : "bi-eye-fill"  
  }

  showPassword() {
    this.passwordIsShowed = !this.passwordIsShowed
    this.changeCurrentEyePasswordIcon();
    this.changeCurrentPasswordInput();
 
  }
}
