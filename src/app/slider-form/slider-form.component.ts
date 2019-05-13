/**
* Author: ShepHertz
* SliderFormComponent form
*/
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { doctorNameArray } from '../mock-data/mock-data';
import { IDiagnosis, IDoctor } from '../models/model';
import { IInsuredMember, Claim } from '../models/models';
import {LibertyService} from '../liberty.service';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))])
    ])
  ]
})
export class SliderFormComponent implements OnInit {
  loading = false;
  insuredMemberArray: IInsuredMember[];
  memberTypeArray: Claim[];
  doctorNameArray: IDoctor[];
  diagnosisNameArray: IDiagnosis[];
  showScreen: number;
  doctorNameSearchArray;
  diagnosisNameSearchArray;
  claimResArray;

  selectedAnswers = [];
  screenArray: number[] = [1, 2, 3, 4, 5, 6];
  searchStr = '';
  dSearchStr = '';
  showPopup = false;
  showDiagPopup = false;
  docSelected = false;
  diagSelected = false;
  progressBarPercent = 0;
  currency = 'HKD'; price = '';

  constructor(
    private liberty: LibertyService,
    private router: Router
     ) {
  }

  ngOnInit() {
    /* Navigate to home if localStorage tem not present */
    if (this.liberty.getInsuredMembers() === null) {
      this.router.navigate(['']);
    }
    /* assign mock data */
    this.doctorNameArray = doctorNameArray;

    this.insuredMemberArray = this.liberty.getInsuredMembers();
    this.getClaimDetail();

    /* Set initial screen */
    this.showScreen = this.screenArray[0];

    /* Make copy for auto search */
    this.doctorNameSearchArray = JSON.parse(JSON.stringify(this.doctorNameArray));
  }

  /**
   * Gets claim detail
   */
  getClaimDetail() {
    this.loading = true;
    this.liberty.getClaimDetails().subscribe(res => {
      this.loading = false;
      this.memberTypeArray = Object.assign([], res.result);
      this.claimResArray = Object.assign([], res.result);
    }, err => {
      console.log(err);
      this.loading = false;
    }, () => {
    });
  }

  /**
   * Calculates progress bar percent
   * @returns progress bar percent
   */
  calcProgressBarPercent(): number {
    if (this.progressBarPercent >= 100) {
      return 100;
    }
    const divider = 100 / (this.screenArray.length - 1);
    this.progressBarPercent = Math.floor((this.showScreen - 1) * divider);
    return this.progressBarPercent;
  }

  /**
   * Shows search list
   */
  showSearchList() {
    if (this.searchStr.length > 2) {
      this.showPopup = true;
    } else {
      this.showPopup = false;
    }
  }

  /**
   * Shows diagnosis list
   */
  showDiagList() {
    this.docSelected = false;
    if (this.dSearchStr.length > 2) {
      this.showDiagPopup = true;
    } else {
      this.showDiagPopup = false;
    }
  }

  /**
   * Makes selected
   * @param item Item to be selected
   * @param screenIndex Index of screen in array
   */
  makeSelected(item: any, screenIndex: number) {
    this.selectedAnswers[screenIndex - 1] = item;
    this.showScreen = this.screenArray[screenIndex];
  }

  /**
   * Makes claim selected
   * @param item Item to be selected
   * @param screenIndex Index of screen in array
   * @param arrIndex Index of memberTypeArray
   */
  makeClaimSelected(item: any, screenIndex: number, arrIndex: number) {
    // select diagnosis array
    this.diagnosisNameArray = Object.assign([], this.claimResArray[arrIndex].diognosisList);
    this.diagnosisNameSearchArray = JSON.parse(JSON.stringify(this.diagnosisNameArray));
    this.makeSelected(item, screenIndex);
  }

  /**
   * Removes special characters from string
   * @param str Input String
   * @returns string
   */
  removeSpecialChars(str: string): string {
    return str.replace(/[^a-zA-Z ]/g, '').trim();
  }

  /**
   * Next screen
   */
  nextScreen() {
    this.showScreen += 1;
  }

  /**
   * Highlights search with strong tag
   * @param name string
   * @returns string
   */
  highlightSearch(name: string) {
    return name.replace(new RegExp(this.searchStr, 'ig'), '<strong>' + this.searchStr + '</strong>');
  }

  /**
   * Selects doctor and assigns to selected answers array
   * @param dname string
   */
  selectDoctor(dname: string) {
    this.searchStr = dname;
    this.showPopup = false;
    this.docSelected = true;
    this.selectedAnswers[3] = dname;
  }

  /**
   * Selects diagnosis and assigns to selected answers array
   * @param diag obj
   */
  selectDiag(diag) {
    this.dSearchStr = diag.diagnosisDescription;
    this.showDiagPopup = false;
    this.diagSelected = true;
    this.selectedAnswers[4] = diag.diagnosisDescription;
    const element: HTMLElement = document.getElementById(diag.diagnosisCode);
    element.click();
  }

  /**
   * Makes diagnosis as selected
   * @param item string
   * @param screenIndex str
   */
  makeDiag(item: string, screenIndex: number) {
    this.dSearchStr = item;
    this.selectedAnswers[screenIndex - 1] = item;
  }

  /**
   * Calculates Previous date
   * @param calender Reference element
   */
  prevDate(calender) {
    const CurrentDate: Date = new Date();
    CurrentDate.setDate(CurrentDate.getDate() - 1);
    calender.value = CurrentDate;
  }

  /**
   * Select calendar date
   * @param calenderDate Reference element
   */
  consultDate(calenderDate) {
    this.selectedAnswers[2] = calenderDate.value;
  }

  /**
   * Checks value
   * @param price string
   */
  checkVal(price) {
    if (price.length > 0) {
      this.selectedAnswers[6] = price;
    } else {
      delete this.selectedAnswers[6];
    }
  }

  /**
   * Checks if fields are invalid
   * @returns boolean
   */
  checkIfInvalid() {
    if (this.showScreen === 3 && !this.selectedAnswers[2]) {
      return true;
    } else if (this.showScreen === 4 && (this.selectedAnswers.length < 4 || !this.searchStr)) {
      return true;
    } else if (this.showScreen === 5 && (this.selectedAnswers.length < 5 || !this.dSearchStr)) {
      return true;
    } else if (this.showScreen === 6 && !this.selectedAnswers[5]) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Submits form
   */
  submitForm() {
    const json = {
      price: this.price,
      currency: this.currency,
    };
    this.selectedAnswers[5] = json;
    console.log(this.selectedAnswers);
    this.liberty.deleteStorageItem('policy');
    this.liberty.deleteStorageItem('insuredMembers');
    this.router.navigate(['/confirmed']);
  }

}
