import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {
  }
  genericPost(endpoint:string, payload:any) {
    console.log(this.serverUrl+endpoint)
    return this.http.post(this.serverUrl+endpoint, payload)
  }
  genericGet(endpoint: string){
    return this.http.get(this.serverUrl+endpoint)
  }
}
