import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploadService } from '../services/file-upload.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-modify-boissons',
  templateUrl: './modify-boissons.component.html',
  styleUrls: ['./modify-boissons.component.scss']
})
export class ModifyBoissonsComponent implements OnInit {
  public maBoisson:any=<any>{};
  public modifierBoisson!:UntypedFormGroup;
  public id!:string;
  public nom!:string;
  selectedFiles: FileList | undefined;
  currentFileUpload!: FileUpload;
  percentage!: number;


  constructor(
    private _api:ApiService,
    private route:ActivatedRoute,
    private fb:UntypedFormBuilder,
    private router:Router,
    private userService:AuthService,
    private uploadService: FileUploadService,
    private afs: FirebaseService

    ) { 
    this.modifierBoisson=this.fb.group({
      nom:['',Validators.required],
      type:['',Validators.required],
      prix_vente:['',Validators.required],
      prix_achat:['',Validators.required] 
    })
  }
  ngOnInit(): void {
    this.nom = this.route.snapshot.params['name'];
    this.id = this.route.snapshot.params['id'];
  }
  
  logout(){
    this.userService.clearStorage();
    this.router.navigate(['/login'])
  }
  onSubmit() {
    this.upload(this.modifierBoisson.value)
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(datas: any): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.deleteFile(this.nom,'boissons')
    this.uploadService.updateToStorage(this.currentFileUpload, datas, 'boissons',this.id).subscribe(
      percentage => {
        this.percentage = Math.round(percentage!);
      },
      error => {
        console.log(error);
      }
    );
    this.ngOnInit()
  }
}
