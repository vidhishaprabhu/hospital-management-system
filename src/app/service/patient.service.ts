import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../../types/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  http=inject(HttpClient);
  apiUrl="http://localhost:8000/api/patients";
  getPatients(){
    return this.http.get<Patient[]>(this.apiUrl);
  }
  addPatients(patient:Patient){
    return this.http.post<Patient>(this.apiUrl,patient);
  }
}
