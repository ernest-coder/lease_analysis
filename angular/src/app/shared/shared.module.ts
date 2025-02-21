import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonPrimaryComponent} from "./components/buttons/button-primary/button-primary.component";
import {ButtonAccentComponent} from "./components/buttons/button-accent/button-accent.component";
import {ButtonTertiaryComponent} from "./components/buttons/button-tertiary/button-tertiary.component";
import {ButtonDangerComponent} from "./components/buttons/button-danger/button-danger.component";
import {ButtonCancelComponent} from "./components/buttons/button-cancel/button-cancel.component";
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatChipsModule} from "@angular/material/chips";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonDangerLightComponent} from "./components/buttons/button-danger-light/button-danger-light.component";
import {ButtonSuccessComponent} from "./components/buttons/button-success/button-success.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import {ButtonWarningLightComponent} from "./components/buttons/button-warning-light/button-warning-light.component";
import {MatMenuModule} from "@angular/material/menu";
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AlertToastComponent } from './components/alert-toast/alert-toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [
    ButtonPrimaryComponent,
    ButtonAccentComponent,
    ButtonTertiaryComponent,
    ButtonDangerComponent,
    ButtonDangerLightComponent,
    ButtonWarningLightComponent,
    ButtonSuccessComponent,
    ButtonCancelComponent,
    ErrorDialogComponent,
    AlertToastComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatTooltipModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    MatDialogModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [
    ButtonPrimaryComponent,
    ButtonAccentComponent,
    ButtonTertiaryComponent,
    ButtonDangerComponent,
    ButtonDangerLightComponent,
    ButtonWarningLightComponent,
    ButtonSuccessComponent,
    ButtonCancelComponent,
    ErrorDialogComponent,
    AlertToastComponent,
    BreadcrumbComponent,
  ],
  providers: [],
})
export class SharedModule { }
