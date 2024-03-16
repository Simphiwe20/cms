import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('zoomHoverCard1', [
      state('initial', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.1)' })),
      transition('initial => hovered', animate('200ms ease-in')),
      transition('hovered => initial', animate('200ms ease-out'))
    ]),
    trigger('zoomHoverCard2', [
      state('initial', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.1)' })),
      transition('initial => hovered', animate('200ms ease-in')),
      transition('hovered => initial', animate('200ms ease-out'))
    ])
  ]
})
export class LandingComponent {

  cardState1 = 'initial';
  cardState2 = 'initial';

  onMouseEnter(cardNumber: number) {
    if (cardNumber === 1) {
      this.cardState1 = 'hovered';
    } else if (cardNumber === 2) {
      this.cardState2 = 'hovered';
    }
  }

  onMouseLeave(cardNumber: number) {
    if (cardNumber === 1) {
      this.cardState1 = 'initial';
    } else if (cardNumber === 2) {
      this.cardState2 = 'initial';
    }
  }

}
