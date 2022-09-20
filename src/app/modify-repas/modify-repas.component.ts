import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-modify-repas',
  templateUrl: './modify-repas.component.html',
  styleUrls: ['./modify-repas.component.scss']
})
export class ModifyRepasComponent implements OnInit {
  public monRepas: any;
  public modifierRepas: UntypedFormGroup;
  public nom!: string;
  public id!: string;
  navbarClass!: string;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;

  ngOnInit(): void {
    this.navbarClass = 'menu';
    this.id = this.route.snapshot.params['id'];
    this.nom = this.route.snapshot.params['name'];
  }
  constructor(
    private afs: FirebaseService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: AuthService,
    private uploadService: FileUploadService
  ) {
    this.modifierRepas = this.fb.group({
      nom: ['', Validators.required],
      origine: ['', Validators.required],
      type: ['', Validators.required],
      prix_vente: ['', Validators.required],
      prix_achat: ['', Validators.required],
      description: ['']
    })
  }
  logout() {
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  onSubmit() {
    this.upload(this.modifierRepas.value)
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(datas: any): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.deleteFile(this.nom,'repas')
    this.uploadService.updateToStorage(this.currentFileUpload, datas, 'repas',this.id).subscribe(
      percentage => {
        this.percentage = Math.round(percentage!);
      },
      error => {
        console.log(error);
      }
    );
    this.ngOnInit()
  }

  onReload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => {
        this.router.navigate([currentUrl]);
      }
    )
  }
}
