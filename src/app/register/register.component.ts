import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService=inject(AuthService);

  formBuilder=inject(FormBuilder);
  router=inject(Router);
  registerForm=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });

  register(){
    this.authService.register({
      name:this.registerForm.value.name,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password
    }).subscribe((result:any)=>{
      console.log("Registered name ",result);
      localStorage.setItem('token',result.token);
      alert("User register successfully");
      this.router.navigateByUrl('/login')
    })

  }

}
