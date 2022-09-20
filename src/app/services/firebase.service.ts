import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }
  createBoisson(value: any) {
    return this.db.collection('boissons').add(value);
  }
  createUsers(value: any) {
    return this.db.collection('restaurants').add(value);
  }
  createRepas(value: any,id:any) {
    return this.db.doc(`repas/${id}`).update(value);
  }
  modifyBoisson(value: any,id:any) {
    return this.db.doc(`boissons/${id}`).update(value);
  }
  validate(id:any) {
    return this.db.doc(`commandes/${id}`).update({statut:true});
  }
  modifyRepas(value: any) {
    return this.db.collection('repas').add(value);
  }
  getBoisson(id:string) {
    return this.db.collection("boissons").
    doc(id).get();
  }
  getRepa(id:string) {
    return new Promise<any>((resolve)=>{this.db.collection("repas").doc(id).get().subscribe(users => resolve(users))}) 
  }
  getBoissons(restau:string) {
    return this.db.collection("boissons",ref=>ref.where("restaurant","==",restau)).valueChanges({idField:'id'});
  }
  getRepas(restau:string) {
    return this.db.collection("repas",ref=>ref.where("restaurant","==",restau)).valueChanges({idField:'id'});
  }
  getCommandes(restau:string) {
    return this.db.collection("commandes",ref=>ref.where("restaurant","==",restau).where("statut","==",false)).valueChanges({idField:'id'});
  }
  getM(restau:string) {
    var d=new Date()
    var m = d.getMonth()
    console.log(restau)
    return this.db.collection("compabilites",ref=>ref.where("mois","==",parseInt(`${m+1}`,10)).where("restaurant","==",restau)).valueChanges();
  }
  getY(restau:string) {
    var d=new Date().toDateString()
    return this.db.collection("compabilites",ref=>ref.where("jour","==",d).where("restaurant","==",restau)).valueChanges();
  }
  getRentabilité(restau:string) {
    var d=new Date()
    var y = d.getFullYear()
    return this.db.collection("compabilites",ref=>ref.where('annee','==',parseInt(`${y}`,10)).where("restaurant","==",restau)).valueChanges();
  }
  getRole(restau:string) {
    var d=new Date()
    var y = d.getFullYear()
    return this.db.collection("subscriptions",ref=>ref.where("annee","==",parseInt(`${y}`,10)).where("id","==",restau)).valueChanges();
  }
  getStatus(restau:string) {
    var d=new Date()
    var y = d.getFullYear()
    var m = d.getMonth()
    return this.db.collection("subscriptions",ref=>ref.where("annee","==",parseInt(`${y}`,10)).where("mois","==",parseInt(`${m+1}`,10)).where("id","==",restau)).valueChanges();
  }
  delete(id: any) {
    return this.db.collection("contacts").doc(id).delete();
  }
  deleteRepas(id: any) {
    return this.db.collection("repas").doc(id).delete();
  }
  deleteBoisson(id: any) {
    return this.db.collection("boissons").doc(id).delete();
  }
}
