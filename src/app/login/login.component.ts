import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage!: string;
  public isLogin: boolean = false;
  public form!:boolean

  constructor(private fb: FormBuilder,
    private userService: AuthService,
    private router: Router,
    private _api: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this._api.postTypeRequest('auth/login', formValue).subscribe(
      (res: any) => {
        if (res.userId) {
          this.userService.setDataInLocalStorage('token', JSON.stringify(res.token));
          this.userService.setDataInLocalStorage('id', res.response.id);
          this.router.navigate(['/profil'])
        } else {
          this.router.navigate(['/login'])
        }
      }
    )
  }
  public isLogedIn() {
    if (this.userService.getUserDetails() != null) {
      this.isLogin = true
    }
  }

  ngOnInit(): void {
    this.isLogedIn();
    this.form=true
  }

  logout() {
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  close(){
    this.form = false
  }
}
