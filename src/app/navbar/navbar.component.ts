import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _api:ApiService,private userService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
logout(){
    this.userService.clearStorage();
    this.router.navigate(['/loginadmin'])
  }
}
