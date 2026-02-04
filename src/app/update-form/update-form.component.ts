import { Component, inject } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../types/patient';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css'
})
export class UpdateFormComponent {
  formsBuilder=inject(FormBuilder);
  router=inject(Router);
  updateForm=this.formsBuilder.group({
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

  })

  isEdit=false;
  patientService=inject(PatientService);
  route=inject(ActivatedRoute);
  patients:Patient[]=[];
  ngOnInit(){
    const id=this.route.snapshot.params['id'];
    if(id){
      this.isEdit=true;
      this.patientService.getPatientById(id).subscribe((patient:Patient)=>{
        this.updateForm.patchValue({
          name:patient.name,
          date_of_birth:patient.date_of_birth,
          gender:patient.gender,
          address:patient.address,
          phone_number:patient.phone_number,
          admission_date:patient.admission_date,
          discharge_date:patient.discharge_date,
        });
      })
    }

  }
  update(){
    const id=this.route.snapshot.params['id'];
    this.patientService.updatePatient({
      id:id,
      name:this.updateForm.value.name!,
      date_of_birth:this.updateForm.value.date_of_birth!,
      gender:this.updateForm.value.gender!,
      address:this.updateForm.value.address!,
      phone_number:this.updateForm.value.phone_number!,
      admission_date:this.updateForm.value.admission_date!,
      discharge_date:this.updateForm.value.discharge_date!  
    }).subscribe((patient:Patient)=>{
      alert('Patient Updated successfully');
      this.router.navigateByUrl('/');
    })
  }
  


}
