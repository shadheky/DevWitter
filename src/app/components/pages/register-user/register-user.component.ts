import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormService } from 'src/app/services/login-form.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  
  userToPersit:User = {
    username:"",
    password:""
  }
  confirmPasswordValue:string = "";

  formIsSubmitted:boolean = false;

  userFormGroup:FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(60)]),
    password: new FormControl("",[Validators.required, Validators.maxLength(80)]),
    confirmPassword: new FormControl("",[Validators.required, Validators.maxLength(80)])
  })

  constructor(public loginFormService:LoginFormService, private userService:UserService, private messageService:MessagesService, private router:Router ) {}

  get username() {
    return this.userFormGroup.get('username');
  }
  get password() {
    return this.userFormGroup.get('password');
  }
  get confirmPassword() {
    return this.userFormGroup.get('confirmPassword');
  }

  isNotLoged():boolean {
    return localStorage.getItem('token') === null;
  }

  openLoginForm():void {
    this.loginFormService.showLoginScreen();
  }

  createUser():void {
    if(this.userFormGroup.invalid) {
      return
    }

    if(this.confirmPasswordValue !== this.userToPersit.password){
        this.messageService.add("As senhas precisam ser iguais");
        return;
    }

    this.disableButton();
    
    this.userToPersit.username = this.userToPersit.username.trim();
    this.userService.createUser(this.userToPersit).subscribe(
      response => { 
        this.messageService.add("Usuário cadastrado com sucesso");
        this.router.navigate(['/'])
        this.loginFormService.showLoginScreen();
        this.userToPersit = {
          username:"",
          password:""
        }
      },
      err => {
        this.messageService.add(err.error.Message);
        this.enableButton();
      }
    );

  }

  disableButton():void {
    this.formIsSubmitted = true;
  }

  enableButton():void {
    this.formIsSubmitted = false;
  }

}
