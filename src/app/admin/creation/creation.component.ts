import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public registerForm:FormGroup;
  public errorMessage!:string;
  public successMessage!:string;
  public isLogin:boolean=false;
  dis:string='d-none'
  constructor(private fb:FormBuilder,
              private userService:AuthService,
              private router:Router,
              private _api:ApiService) { 
    this.registerForm = this.fb.group({
      titre: ['', Validators.required],
      appercu: ['', Validators.required],
      date: ['', Validators.required],
      couverture: ['', Validators.required],
      bloc1: this.fb.group({
        titre: ['', Validators.required],
        contenu: ['', Validators.required],
        photo: ['', Validators.required],
      }),
      bloc2: this.fb.group({
        titre: ['', Validators.required],
        contenu: ['', Validators.required],
        photo: ['', Validators.required],
      }),
      bloc3: this.fb.group({
        titre: [''],
        contenu: [''],
        photo: [''],
      }),
      bloc4: this.fb.group({
        titre: [''],
        contenu: [''],
        photo: [''],
      }),
    });
  } 

  onSubmit(){
    const formValue = this.registerForm.value ;
    console.log(formValue)
      this._api.postTypeRequest(`prets`,formValue).subscribe(
        (res:any)=>{
          if(res.status){
            this.router.navigate(['/admin/prets'])
            this.successMessage=res.message
            this.dis = ''
          }else{
            this.errorMessage=res.message
            this.dis = ''
          }
        }
      )
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
