import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ApiService {
  public base = 'http://localhost:4000/api/'
  constructor(private _http:HttpClient) { }

  getTypeRequest(url:any){
    return this._http.get(`${this.base}${url}`).pipe(map(res=>{
      return res;
    }))
  }

  postTypeRequest(url:any,payload:any){
    return this._http.post(`${this.base}${url}`,payload).pipe(map(res=>{
      return res;
    }))
  }

  putTypeRequest(url:any,payload:any){
    return this._http.put(`${this.base}${url}`,payload).pipe(map(res=>{
      return res;
    }))
  }

  delTypeRequest(url:any){
    return this._http.delete(`${this.base}${url}`).pipe(map(res=>{
      return res;
    }))
  }
}
