import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-boissons',
  templateUrl: './boissons.component.html',
  styleUrls: ['./boissons.component.scss']
})
export class BoissonsComponent implements OnInit {
  public datas: any[] = [];
    isShow = false


  constructor(private userService: AuthService, public afAuth: AngularFireAuth,
    private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getBoissons(this.userService.getUid()!).subscribe(
      (res:any) => (this.datas = res,this.isShow  = true)
    )
  }
  delete(id:string){
    this.firebaseService.deleteBoisson(id)
  }
  modify(id:string,name:string){
    this.router.navigate([`modifier/boisson/${id}/${name}`])
  }
  logout() {
    this.userService.clearStorage();
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }

}
