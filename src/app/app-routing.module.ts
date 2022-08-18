import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { CreationComponent } from './admin/creation/creation.component';
import { ListeComponent } from './admin/liste/liste.component';
import { ModificationComponent } from './admin/modification/modification.component';
import { ContactComponent } from './contact/contact.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { Authguard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path:'acceuil',component:HomeComponent
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'contact',component:ContactComponent
  },
  {
    path:'blog',component:PostsComponent
  },
  {
    path:'post/:titre',component:PostComponent
  },
  {
    path:'admin',canActivate:[Authguard],component:AdminComponent
  },
  {
    path:'admin/liste',canActivate:[Authguard],component:ListeComponent
  },
  {
    path:'admin/contact',canActivate:[Authguard],component:ContactComponent
  },
  {
    path:'admin/create',canActivate:[Authguard],component:CreationComponent
  },
  {
    path:'admin/modify',canActivate:[Authguard],component:ModificationComponent
  },
  {
    path:'',redirectTo:'/acceuil',pathMatch:'full'
  },
  {
    path:'not-found',component:FourOhFourComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'**',redirectTo:'/not-found',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
