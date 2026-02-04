import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { UpdateFormComponent } from './update-form/update-form.component';

export const routes: Routes = [
  {
    path:'',
    component:PatientComponent
  },
  {
    path:'patients/:id',
    component:UpdateFormComponent
  }
];
