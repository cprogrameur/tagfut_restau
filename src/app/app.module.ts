import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgChartsModule } from 'ng2-charts';
import { RepasComponent } from './repas/repas.component';
import { BoissonsComponent } from './boissons/boissons.component';
import { CreateRepasComponent } from './create-repas/create-repas.component';
import { CreateBoissonsComponent } from './create-boissons/create-boissons.component';
import { ModifyBoissonsComponent } from './modify-boissons/modify-boissons.component';
import { ModifyRepasComponent } from './modify-repas/modify-repas.component';
import { CommandesComponent } from './commandes/commandes.component';
import { AbonnementComponent } from './abonnement/abonnement.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FourOhFourComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    RepasComponent,
    BoissonsComponent,
    CreateRepasComponent,
    CreateBoissonsComponent,
    ModifyBoissonsComponent,
    ModifyRepasComponent,
    CommandesComponent,
    AbonnementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    AngularFireAuthModule,
    NgChartsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
