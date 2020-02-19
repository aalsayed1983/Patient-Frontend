import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { Patient } from '../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService implements Resolve<any> {

  onPatientChanged: BehaviorSubject<any>;
  env = environment;
  patients: Patient[];

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onPatientChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getAllPatients()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
   * Get All Patients
   *
   * @returns {Promise<any>}
   */
  getAllPatients (): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this.env.host}/api/patients`)
        .subscribe((response: any) => {
          this.patients = response;
          this.onPatientChanged.next(this.patients);
          resolve(response);
        }, reject);
    });
  }

}
