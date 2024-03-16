import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(public api: ApiService) {
    const data = this.api.genericGet('/get-profile')
      .subscribe({
        next: (res: any) => {
        const item = res;
         console.log( item);
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
  profiles: any[] = [
    {
      name: 'Angel',
      surname: 'Nthebe',
      address: '327 Mosiliki Jozi ',
      id: '123456789',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Female',
      policyNumber: 'ABC123',
      email: 'angel@gmail.com',
      contact: '1234567890'
    }]
    

}
