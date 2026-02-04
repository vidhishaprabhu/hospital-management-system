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
  getPatientById(id:number){
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }
  addPatients(patient:Patient){
    return this.http.post<Patient>(this.apiUrl,patient);
  }
  updatePatient(patient:Patient){
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`,patient);
  }
  deletePatient(id:number){
    return this.http.delete<Patient>(`${this.apiUrl}/${id}`);
  }
}
