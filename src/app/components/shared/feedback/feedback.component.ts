import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  newUser: any

  constructor(private route: ActivatedRoute, private routes: Router) { }

  ngOnInit(): void {
    this.route.queryParams?.subscribe(params => {
      this.newUser = JSON.parse(params['data'])
      console.log(this.newUser)
    })
  }

  toHome() {
    this.routes.navigate(['/home'])
  }

}
