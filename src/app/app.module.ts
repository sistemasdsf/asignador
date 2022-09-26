import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ModalAllocationManagerComponent } from './modal/modal-allocation-manager/modal-allocation-manager.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { NoAccessComponentComponent } from './pages/no-access-component/no-access-component.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [
  MatIconModule
];

const routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'noAccess', component: NoAccessComponentComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ModalAllocationManagerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    ...materialModules,
    MatDialogModule,
    HttpClientModule,
    ScrollingModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  bootstrap: [AppComponent],
  exports: [
    ...materialModules
  ]
})
export class AppModule { }
