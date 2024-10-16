import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  developers: any = [
    {name: "Angel Nthebe", cellphone: "063 573 6572", linkedenProf: "", email: "Angelnthebe00@gmail.com"},
    {name: "Simphiwe Nene", cellphone: "062 810 7203", linkedenProf: "", email: "gsimphiwenene@gmail.com"},
    {name: "Tiisetso Pule", cellphone: "079 443 5252", linkedenProf: "", email: "prudencepule62@gmail.com"}
  ]

  constructor(private sanitizer: DomSanitizer) {
    this.developers.forEach((developer: any) => developer.email = this.sanitizer.bypassSecurityTrustUrl(developer.email))

    console.log("DEVS: ", this.developers)
  }

}
