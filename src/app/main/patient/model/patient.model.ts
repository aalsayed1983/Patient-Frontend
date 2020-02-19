import { DatePipe } from '@angular/common';

export class Patient {
    id: string;
    pasNumber: string;
    forenames: string;
    surname: string;
    dateOfBirth: DatePipe;
    sexCode: string;
    homeTelephoneNumber: string;

    constructor(patient?) {
        patient = patient || {};
        this.id = patient.id || null;
        this.pasNumber = patient.pasNumber || null;
        this.forenames = patient.forenames || null;
        this.surname = patient.surname || null;
        this.dateOfBirth = patient.dateOfBirth || null;
        this.sexCode = patient.sexCode || null;
        this.homeTelephoneNumber = patient.homeTelephoneNumber || null;
    }
}
