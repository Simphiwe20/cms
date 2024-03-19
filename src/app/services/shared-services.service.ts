import { Injectable } from '@angular/core';
import { ApisServicesService } from './apis-services.service';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {


  res: any

  constructor(private api: ApisServicesService) { }

  generatePwd(): any {
    let chars = 'Z*a&9Sx^Dc%V6$fG#b@7N3h!Jm~4Kl`Op/Iu?Y.tR;e2Wq:zAx]Sx[Cd|F\vB-F0g5Hj8MnkL1+'
    let pwd = ''
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return pwd
  }

  getUser(key: string, storage: string) {
    this.res = storage === 'session' ? sessionStorage?.getItem(key) : localStorage.getItem(key)
    return JSON.parse(this.res)
  }

  storeUser(key: string, value: any, storage: string) {
    this.res = JSON.stringify(value)
    storage === 'session' ? sessionStorage?.setItem(key, this.res) : localStorage.setItem(key, this.res)
    
  }

   monthDiff(d1: Date, d2: Date): number  {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  uploadFiles(files: File[][]): Promise<any> {
    const formData = new FormData();
    files.forEach((fileArray, index) => {
      fileArray.forEach((file, subIndex) => {
        formData.append(`file${index + 1}-${subIndex + 1}`, file);
      });
    });


    return this.api.genericPost('/upload', formData).toPromise();
  }

  getWhoSubmitted(): any {
    let user = this.getUser('currentUser', 'session')
    if(user.role === 'agent') {
      return `${user.fullName}(${user.role})`
    }else {
      return 'This claim came from the policyholder\'s account'
    }
  }

}
