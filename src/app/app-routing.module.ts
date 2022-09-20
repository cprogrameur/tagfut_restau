import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { Authguard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { BoissonsComponent } from './boissons/boissons.component';
import { RepasComponent } from './repas/repas.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ModifyBoissonsComponent } from './modify-boissons/modify-boissons.component';
import { CreateRepasComponent } from './create-repas/create-repas.component';
import { ModifyRepasComponent } from './modify-repas/modify-repas.component';
import { CreateBoissonsComponent } from './create-boissons/create-boissons.component';
import { AbonnementComponent } from './abonnement/abonnement.component';

const redirect = ()=> redirectUnauthorizedTo(['login'])
const routes: Routes = [
  {
    path:'not-found',component:FourOhFourComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'',redirectTo:'/dashboard',pathMatch:'full'
  },
  {
    path:'repas',component:RepasComponent
  },
  {
    path:'modifier/repas/:id/:name',component:ModifyRepasComponent
  },
  {
    path:'repas/ajouter',component:CreateRepasComponent
  },
  // ,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirect}
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'boissons',component:BoissonsComponent
  },
  {
    path:'modifier/boisson/:id/:name',component:ModifyBoissonsComponent
  },
  {
    path:'boisson/ajouter',component:CreateBoissonsComponent
  },
  {
    path:'commandes',component:CommandesComponent
  },
  {
    path:'abonnement',component:AbonnementComponent
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
