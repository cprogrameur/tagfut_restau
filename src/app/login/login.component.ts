import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth} from 'firebase/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public errorMessage!:string;
  public isLogin:boolean=false;
  constructor(private fb:FormBuilder,
              private userService:AuthService,
              private router:Router,
              private _api:ApiService,
              public afAuth: AngularFireAuth
              ) { 
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]]
    })
  } 

  onSubmit(){
    const formValue = this.loginForm.value ;
    return this.afAuth
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            // this.userService.setDataInLocalStorage('token', JSON.stringify(result));
            this.userService.setDataInLocalStorage('uid', user.uid);
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  public isLogedIn(){
    if(this.userService.getUserDetails() !=null){
      this.isLogin = true
    }
  }

  ngOnInit(): void {
    this.isLogedIn()
  }

}
