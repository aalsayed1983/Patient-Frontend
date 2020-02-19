import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule,
  MatSelectModule, MatStepperModule, MatTableModule,
  MatSnackBarModule, MatTabsModule, MatSortModule,
  MatCheckboxModule
} from '@angular/material';
import { AddEditPatientComponent } from '../add-edit-patient/add-edit-patient.component';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { PatientService } from '../service/patient.service';
import { AddEditPatientService } from '../service/add-edit-patient.service';

const routes: Route[] = [
  {
    path: 'pages/patients',
    component: PatientListComponent,
    resolve: {
      data: PatientService
    }
  },
  {
    path: 'pages/patients/:id',
    component: AddEditPatientComponent,
    resolve: {
      data: AddEditPatientService
    }
  }
];

@NgModule({
  declarations: [PatientListComponent, AddEditPatientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    FuseSharedModule,
    MatDatepickerModule
  ],
  providers: [
    PatientService
  ]
})
export class PatientModule { }
