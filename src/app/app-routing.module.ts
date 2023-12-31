import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PostComponent } from './components/pages/post/post.component';
import { PostFromComponent } from './components/forms/post-from/post-from.component';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';

const routes: Routes = [
  {
    path: "",
    component:HomeComponent
  },
  {
    path:"post/:id",
    component:PostComponent
  },
  {
    path:"post/create/newPost",
    component: PostFromComponent
  },
  {
    path:"user/create/newUser",
    component: RegisterUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
