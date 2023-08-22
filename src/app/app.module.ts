import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PostComponent } from './components/pages/post/post.component';
import { PostFromComponent } from './components/forms/post-from/post-from.component';
import {HttpClientModule} from "@angular/common/http";
import { MessageComponent } from './components/message/message.component';
import { LoginScrenComponent } from './components/login-scren/login-scren.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PostComponent,
    PostFromComponent,
    MessageComponent,
    LoginScrenComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
