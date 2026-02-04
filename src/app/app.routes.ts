import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: PatientComponent
      },
      {
        path: 'patients/:id',
        component: UpdateFormComponent
      }
    ]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];
