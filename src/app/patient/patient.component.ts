import { Component, inject } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../../types/patient';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-patient',
  imports: [ReactiveFormsModule, NgFor,NgIf],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent {
  patientService = inject(PatientService);
  patients: Patient[] = [];
  formBuilder = inject(FormBuilder);
  router=inject(Router);
  patientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    date_of_birth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone_number: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    admission_date: ['', [Validators.required]],
    discharge_date: ['', [Validators.required]],
  });
  ngOnInit() {
   this.getPatients();
  }
  getPatients(){
    this.patientService.getPatients().subscribe((patient: Patient[]) => {
      this.patients = patient;
      console.log('Patients are ', this.patients);
    });

  }
  formatDate(date: string | Date) {
    return new Date(date).toISOString().split('T')[0];
  }
  addpatient() {
    this.patientService
      .addPatients({
        id: 0,
        name: this.patientForm.value.name!,
        date_of_birth: this.formatDate(this.patientForm.value.date_of_birth!),
        gender: this.patientForm.value.gender!,
        address: this.patientForm.value.address!,
        phone_number: this.patientForm.value.phone_number!,
        admission_date: this.formatDate(this.patientForm.value.admission_date!),
        discharge_date: this.formatDate(this.patientForm.value.discharge_date!),
      })
      .subscribe((patient: Patient) => {
        this.patients.push(patient);
        console.log('Added Patient is ', patient);
        alert('Patient Added successfully');
      });
  }
  update(id:number){
    this.router.navigateByUrl(`/patients/${id}`);
    
  }
  delete(id:number){
    this.patientService.deletePatient(id).subscribe((patient:Patient)=>{
      alert('Patient Deleted successfully');
      this.getPatients();
    })
  }
}
