import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:AuthService,    public afAuth: AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  this.userService.clearStorage();
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  });
}
}
