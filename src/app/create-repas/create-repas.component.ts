import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-create-repas',
  templateUrl: './create-repas.component.html',
  styleUrls: ['./create-repas.component.scss']
})
export class CreateRepasComponent implements OnInit {

  public ajouterRepas:UntypedFormGroup;
  public nomRestaurant!:string;
  uploadedFiles!: Array<File>;
  nomPhoto!: string;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;


  constructor(
    private userService:AuthService,    
    private uploadService: FileUploadService,
    private route:ActivatedRoute,private fb:UntypedFormBuilder,private router:Router,private _api:ApiService) { 
    this.ajouterRepas=this.fb.group({
      nom:['',Validators.required],
      origine:['',Validators.required],
      type:['',Validators.required],
      description:[''],
      prix_achat:['',Validators.required],
      prix_vente:['',Validators.required]
    })
  }
  
  logout(){
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  onSubmit() {
    this.upload(this.ajouterRepas.value)
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(datas: any): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload, datas, 'repas').subscribe(
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
