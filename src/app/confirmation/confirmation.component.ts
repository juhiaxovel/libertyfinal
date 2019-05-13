/**
* Author: ShepHertz
* ConfirmationComponent
* showed to the user on submission of form
*/
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  animations: [
    trigger('openClose', [
      state('void => *', style({ background: 'red' })),
      state('* => *', style({ background: 'green' })),
      transition('void => *', animate(2000)),
      transition('void => *', animate('100ms ease-in')),
      transition('inactive => active', animate('100ms ease-out'))
    ])
  ],
})
export class ConfirmationComponent implements OnInit {
  buttonText = 'Save this number';
  isDisabled = false;
  isOpen = false;

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
