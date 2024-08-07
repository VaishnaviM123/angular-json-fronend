import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  profileImg: string = "https://i.postimg.cc/gJkQHZkN/Screenshot-2024-08-05-204628.png";
  admin: any = {};

  constructor(private r: Router, private cd: ChangeDetectorRef,private ts:ToastService) { }

  ngOnInit(): void {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      this.isLogin = true;
      try {
        this.admin = JSON.parse(adminData);
        // console.log('Admin data:', this.admin);  // Debugging line
        if (this.admin.profile && this.admin.profile !== "") {
          this.profileImg = this.admin.profile;
        }
        this.cd.detectChanges();  // Manually trigger change detection
      } catch (e) {
        console.error('Error parsing admin data', e);
      }
    }
  }

  signOut(): void {
    localStorage.clear();
    this.r.navigateByUrl('/').then(() => {
      this.isLogin = false;
      this.ts.showSuccess("Logged Out Successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
  

  loginMethod(): void {
    this.r.navigateByUrl("/login");
  }
}
