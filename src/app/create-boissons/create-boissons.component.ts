import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-create-boissons',
  templateUrl: './create-boissons.component.html',
  styleUrls: ['./create-boissons.component.scss']
})
export class CreateBoissonsComponent implements OnInit {
  public ajouterBoisson!: UntypedFormGroup;
  public nomRestaurant!: string;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private userService: AuthService,
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
  }
}
