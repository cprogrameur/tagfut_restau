import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {

  public editPret: FormGroup;
  public errorMessage!:string;
  public successMessage!:string;
  public isLogin:boolean=false;
  dis:string='d-none';
  id:number=0
  constructor(private fb: FormBuilder,
              private userService:AuthService,
              private router:Router,
              private _api:ApiService,
              private route:ActivatedRoute) { 
    this.editPret = this.fb.group({
      matricule: ['',[Validators.required,Validators.maxLength(255)]],
      date_pret: ['',Validators.required],
      date_retour: ['',Validators.required],
      isbn:['',Validators.required]
    })
  } 

  onSubmit(){
    const formValue = this.editPret.value ;
      this._api.putTypeRequest(`prets/${this.id}`,formValue).subscribe(
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
    this.id = this.route.snapshot.params['id']
  }

}
