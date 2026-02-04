import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  authService=inject(AuthService);
  router=inject(Router)
  logout(){
    this.authService.logout().subscribe(()=>{
      alert('User logged out successfully');
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    })
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
