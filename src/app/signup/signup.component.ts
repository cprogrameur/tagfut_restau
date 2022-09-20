import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../services/file-upload.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup;
  public errorMessage!: string;
  public isLogin: boolean = false;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;

  constructor(private fb: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth,
    private uploadService: FileUploadService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      nom: ['', [Validators.required, Validators.minLength(4)]],
      nombre_tables: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(4)]],
      password_conf: ['', [Validators.required, Validators.minLength(4)]]
    })
  } 

  onSubmit() {
    const formValue = this.registerForm.value;
    if (formValue.password === formValue.password_conf)
      return this.afAuth
        .createUserWithEmailAndPassword(formValue.email, formValue.password)
        .then((result) => {
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              // this.userService.setDataInLocalStorage('uid', user.uid);
              delete formValue.password;
              delete formValue.password_conf;
              // this.firebase.createUsers(formValue)
              this.upload({...formValue,statut:false});
              this.router.navigate(['login']);
            }
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    else {
      alert('Les mots de passe ne corespondent pas!')
      return null
    }
  }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(datas: any): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload, datas, 'restaurants').subscribe(
      percentage => {
        this.percentage = Math.round(percentage!);
      },
      error => {
        console.log(error);
      }
    );
    this.ngOnInit()
  }

  ngOnInit(): void {
  }

}
