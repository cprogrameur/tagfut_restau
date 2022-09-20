import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  public datas: any;
      isShow = false


  constructor(private userService: AuthService, public afAuth: AngularFireAuth,
    private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getCommandes(this.userService.getUid()!).subscribe(
      res => (this.datas = res,this.isShow  = true)
    )
  }
  logout() {
    this.userService.clearStorage();
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }
  valider(id:any){
    this.firebaseService.validate(id)
  }

}
