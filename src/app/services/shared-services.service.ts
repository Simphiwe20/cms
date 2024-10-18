import { Injectable } from '@angular/core';
import { ApisServicesService } from './apis-services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  uploadFiles(files: File[][], fileType: string): Promise<any> {
    const formData = new FormData();
    files.forEach((fileArray, index) => {
      fileArray.forEach((file, subIndex) => {
        formData.append(`file${index + 1}-${subIndex + 1}`, file);
      });
    });


    return this.api.genericPost(`${fileType}`, formData).toPromise();
  }

  getWhoSubmitted(): any {
    let user = this.getUser('currentUser', 'session')
    if (user.role === 'agent') {
      return `${user.firstName} ${user.lastName}(${user.role})`
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
        if (employee.Email === user.email) {
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
        let newUser = this.newUsers[this.newUsers.length - 1]
        this.sendPwd(newUser)
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

  sendPwd(newUser: any): any {
    this.api.genericPost('/sendPassword', newUser)
          .subscribe({
            next: () => { },
            error: () => { },
            complete: () => { }
    })
  }

  getFormControl(isReceived: boolean, data: any): FormGroup {
    if (!isReceived) {
      return new FormGroup({
        firstName: new FormControl({ value: `${data.firstName}`, disabled: isReceived }, [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl({ value: `${data.lastName}`, disabled: isReceived}, [Validators.required, Validators.minLength(3)]),
        idNumber: new FormControl({ value: `${data.idNumber}`, disabled: isReceived }, [Validators.required]),
        gender: new FormControl({ value: `${data.gender}`, disabled: data.gender }, [Validators.required]),
        DOB: new FormControl(''),
        email: new FormControl({ value: `${data.email}`, disabled: data.email }, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellNumber: new FormControl({ value: `0${data.cellPhone}`, disabled: data.cellPhone }, [Validators.required]),
        address: new FormGroup({
          streetName: new FormControl({ value: `${data.address.streetName}`, disabled: data.streetName }, [Validators.required]),
          streetNumber: new FormControl({ value: `${data.address.streetNumber}`, disabled: data.streetNumber }, [Validators.required]),
          suburb: new FormControl({ value: `${data.address.suburb}`, disabled: data.suburb }, [Validators.required]),
          city: new FormControl({ value: `${data.address.city}`, disabled: data.city }, [Validators.required]),
          code: new FormControl({ value: `${data.address.code}`, disabled: data.code }, [Validators.required, Validators.max(9999)]),

        }),

        password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      })

    }else {
      return new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        idNumber: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        DOB: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellNumber: new FormControl('' , [Validators.required]),
        address: new FormGroup({
          streetName: new FormControl('', [Validators.required]),
          streetNumber: new FormControl('', [Validators.required]),
          suburb: new FormControl('', [Validators.required]),
          city: new FormControl('', [Validators.required]),
          code: new FormControl('', [Validators.required, Validators.max(9999)]),

        }),
        employeeID: new FormControl('' , [Validators.required]),
        role: new FormControl('' , [Validators.required]),
      })        
    }
  }




}
