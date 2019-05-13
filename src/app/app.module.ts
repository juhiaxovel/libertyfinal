/**
* Author: ShepHertz
* Import components and inbuilt modules
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PolicyValidateComponent } from './policy-validate/policy-validate.component';
import { SliderFormComponent } from './slider-form/slider-form.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SelectFromListFilterPipe } from './pipes/searchDoc.pipe';
import { SelectFromDiagFilterPipe } from './pipes/searchDiagnosis.pipe';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PolicyValidateComponent,
    SliderFormComponent,
    SelectFromListFilterPipe,
    SelectFromDiagFilterPipe,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
