import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm!:FormGroup
  constructor(private fb:FormBuilder,private _api:ApiService) { 
    this.contactForm =  this.fb.group(
      {
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        phone:['',Validators.required],
        message:['',Validators.required]
      }
    )
  }

  ngOnInit(): void {
  }
  onSubmit(){
    var formData = this.contactForm.value;
    this._api.postTypeRequest('contact',formData).subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }

}
