import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddEditPatientService implements Resolve<any> {
  
  routeParams: any;
  patient: any;
  onPatientChanged: BehaviorSubject<any>; 
  env = environment;

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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getPatient()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
   * Get Patient by ID, if new, open for create new Patient
   *
   * @returns {Promise<any>}
   */
  getPatient(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onPatientChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(`${this.env.host}/api/patients/` + this.routeParams.id)
          .subscribe((response: any) => {
            this.patient = response;
            this.onPatientChanged.next(this.patient);
            resolve(response);
          }, reject);
      }
    });
  }

  /**
   * Add new Patient
   *
   * @param patient
   * @returns {Promise<any>}
   */
  addPatient(patient): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.env.host}/api/patients`, patient)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  
  /**
   * Edit Selected Patient
   *
   * @param patient
   * @returns {Promise<any>}
   */
  editPatient(patient): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${this.env.host}/api/patients/` + patient.id, patient)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Delete Selected Patient
   *
   * @param patient
   * @returns {Promise<any>}
   */
  deletePatient(patient): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${this.env.host}/api/patients/` + patient.id)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
