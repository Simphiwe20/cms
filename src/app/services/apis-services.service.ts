import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApisServicesService {

  baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) {}

  genericGet(endPoint: string) {
    console.log(this.baseUrl+endPoint)
    return this.http.get(this.baseUrl+endPoint)
  }

  genericPost(endPoint:String, payload: any) {
    return this.http.post(this.baseUrl+endPoint, payload)
  }


}