import { Injectable } from '@angular/core';
import { ApisServicesService } from './apis-services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  data: any;
  user: any;
  employees: any;
  users: any[] = [];
  newUsers: any[] = []

  res: any;
  currentUser: any;

  constructor(private api: ApisServicesService) { }

  get(key: string, sessionType: string): any {
    let data = sessionType === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  store(value: any, key: string, sessionType: string): void {
    sessionType === 'session' ? sessionStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, JSON.stringify(value));
    console.log('User stored')
  }
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

  monthDiff(d1: Date, d2: Date): number {
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
    if (user.role === 'agent') {
      return `${user.fullName} (${user.role})`
    } else {
      return 'This claim came from the policyholder\'s account'
    }
  }

  storeNewUsers(employees: any): void {

    this.api.genericGet('/get-all-users')
      .subscribe({
        next: (res: any) => { this.getNewUser(res, employees) },
        error: () => { },
        complete: () => { }
      })

    console.log("Users: ", this.users)
    console.log(" New users: ", this.newUsers[0])

    console.log("Employees from the spreasSheet", employees)

  }

  getNewUser(users: any, employees: any): void {
    let doesUserExist: boolean;
    console.log(users, employees)
    employees.forEach((employee: any, indx: number) => {
      doesUserExist = false;
      users.forEach((user: any, indx: number) => {
        if (employee.email === user.email) {
          console.log('Found User:', user)
          doesUserExist = true;
        }
      })
      if (!doesUserExist) {
        this.newUsers.push({
          ...employee,
          role: employee.occupation.toLowerCase() == 'agent' ? 'agent' :
            employee.occupation.toLowerCase() == 'manager' ? 'manager' : 'admin',
          password: this.generatePwd(),
          status: 'active',
          address: {
            streetName: "Jozi",
            streetNumber: 20234566,
            city: "Jozi",
            code: 2009,
            suburb: 'Jozi'
          },
          startDate: new Date()
        })
        console.log(this.newUsers[this.newUsers.length - 1])
        this.api.genericPost('/sendPassword', this.newUsers[this.newUsers.length - 1])
          .subscribe({
            next: (res) => {console.log(res)},
            error: () => {},
            complete: () => {}
          })
      }
    })

    this.newUsers.forEach((user: any, indx: number) => {
      this.api.genericPost('/add-user', user)
        .subscribe({
          next: (res) => { console.log(res) },
          error: (err) => { console.log(err) },
          complete: () => { }
        })
    })
  }

  _reason! : string;

  getReason(reason: string){
     this._reason = reason
  }

  




}
