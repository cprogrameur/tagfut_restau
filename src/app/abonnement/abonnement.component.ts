import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {
  public ajouterBoisson!: UntypedFormGroup;
  public nomRestaurant!: string;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;
  public abonne!:boolean;
  public statut!:boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: AuthService,
    private firebaseService: FirebaseService,
    private uploadService: FileUploadService
  ) {
    this.ajouterBoisson = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      prix_achat: ['', Validators.required],
      prix_vente: ['', Validators.required]
    })
  }

  logout() {
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  onSubmit() {
    this.upload(this.ajouterBoisson.value)
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(datas: any): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload, datas, 'boissons').subscribe(
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
    this.nomRestaurant = this.route.snapshot.params['nomRestaurant'];
    this.firebaseService.getStatus(this.userService.getUid()!).subscribe(
      (res)=>{
        res.length==1 ? this.statut=true:this.statut=false
      }
    )
    this.firebaseService.getRole(this.userService.getUid()!).subscribe(
      (res)=>{
        res.length==1 ? this.abonne=true:this.abonne=false
      }
    )
  }
}
