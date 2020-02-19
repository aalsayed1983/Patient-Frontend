import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Patient } from '../model/patient.model';
import { takeUntil } from 'rxjs/operators';
import { AddEditPatientService } from '../service/add-edit-patient.service';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddEditPatientComponent implements OnInit {

  patient: Patient;
  pageType: string;
  patientForm: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {EcommerceProductService} _patientService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */

  constructor(private _formBuilder: FormBuilder,
      private _location: Router,
      private _matSnackBar: MatSnackBar,
      private _patientService: AddEditPatientService) { 

      // Set the default
      this.patient = new Patient();

      // Set the private defaults
      this._unsubscribeAll = new Subject();
    }

  ngOnInit() {
    // Subscribe to update patient on changes
    this._patientService.onPatientChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(patient => {

        if (patient) {
          this.patient = new Patient(patient);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.patient = new Patient();
        }
        this.patientForm = this.createPatientForm();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Create a patient form
   *
   * @returns {FormGroup}
   */
  createPatientForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.patient.id],
      pasNumber: [this.patient.pasNumber],
      forenames: [this.patient.forenames],
      surname: [this.patient.surname],
      dateOfBirth: [this.patient.dateOfBirth],
      sexCode: [this.patient.sexCode],
      homeTelephoneNumber: [this.patient.homeTelephoneNumber],
    });
  }

  /**
   * add Patient
   */
  addPatient(): void {
    const data = this.patientForm.getRawValue();

    this._patientService.addPatient(data)
      .then(() => {
        // Show the success message
        this._matSnackBar.open('Patient added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.navigate(['pages/patients']);
      });
  }

  /**
   * Edit Selected Patient
   */
  editPatient(): void {
    const data = this.patientForm.getRawValue();
    this._patientService.editPatient(data)
      .then(() => {

        // Trigger the subscription with new data
        this._patientService.onPatientChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Patient saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.navigate(['pages/patients']);
      });
  }

  deletePatient(): void {
    const data = this.patientForm.getRawValue();
    this._patientService.deletePatient(data)
      .then(() => {

        // Show the success message
        this._matSnackBar.open('Patient deleted', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.navigate(['pages/patients']);
      });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

}
