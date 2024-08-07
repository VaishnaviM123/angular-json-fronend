import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private r:Router){ }
  
  start(){
    if(localStorage.getItem('admin')){
      this.r.navigateByUrl('/home')
    }else{
      this.r.navigateByUrl('/login')
    }
  }
}
