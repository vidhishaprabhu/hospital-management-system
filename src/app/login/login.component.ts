import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder=inject(FormBuilder);
  authService=inject(AuthService);
  router=inject(Router);
  loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })
  login(){
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }).subscribe((result:any)=>{
      console.log("Logged in ",result);
      alert('Login was successfully done');
      localStorage.setItem('token',result.token);
      this.router.navigateByUrl('/');
    })

  }


}
