import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApisServicesService {

  baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  genericGet(endPoint: string) {
    console.log(this.baseUrl + endPoint)
    if (endPoint.includes('/download-files')) window.open(this.baseUrl + endPoint)
    return this.http.get(this.baseUrl + endPoint)
  }

  genericPost(endPoint: String, payload: any) {
    return this.http.post(this.baseUrl + endPoint, payload)
  }

  genericUpdate(endPoint: string, payload: any) {
    return this.http.put(this.baseUrl + endPoint, payload)
  }

  // Generic Post
  genericPut(endpoint: string, payload: any) {
    return this.http.put(this.baseUrl + endpoint, payload)
  }
  
 
  // genericPut(endPoint:String, payload: any) {
  //   return this.http.put(this.baseUrl+endPoint, payload)
  // }

  // Tiisetso Code Might remove
  addUser(data: any) {
    return this.http.post(this.baseUrl, data)
  }

  updateUser(data: any) {
    return this.http.put(this.baseUrl, data);
  }



}
