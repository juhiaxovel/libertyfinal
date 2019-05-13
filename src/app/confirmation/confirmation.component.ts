/**
* Author: ShepHertz
* ConfirmationComponent
* showed to the user on submission of form
*/
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))])
    ])
  ]
})
export class ConfirmationComponent implements OnInit {
  buttonText = 'Save this number';

  constructor() { }

  ngOnInit() {
  }

  /* To copy any Text */
  copyReferenceCode(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.buttonText = 'Copied!';
  }

}
