import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.scss']
})
export class RepasComponent implements OnInit {
  public datas: any[] = [];
  isShow = false

  constructor(private userService: AuthService, public afAuth: AngularFireAuth,
    private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getRepas(this.userService.getUid()!).subscribe(
      (res:any) => ( this.datas = res,console.log(res),this.isShow  = true
      )
    )
  }
  
  delete(id:string){
    this.firebaseService.deleteRepas(id)
  }
  modify(id:string,name:string){
    this.router.navigate([`modifier/repas/${id}/${name}`])
  }
  logout() {
    this.userService.clearStorage();
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }
}
