import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {
  public ajouterBoisson!: UntypedFormGroup;
  public nomRestaurant!: string;
  public type!: string;
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
  }
  selecttype(type: any): void {
    this.type = type;
  }

  ngOnInit(): void {
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
