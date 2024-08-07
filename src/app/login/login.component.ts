import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private service:AdminService,private route:Router,private ts:ToastService){}

  //model for login form
  loginFormModel=this.fb.group({
    email:["",[Validators.required,Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}$')]],
    psw:["",[Validators.required,Validators.pattern('^[a-zA-Z0-9]+$')]]
  })

  //login method
  login(){ 
    var path=this.loginFormModel.value
    if(this.loginFormModel.valid){
      // console.log(path.email, path.psw);
      var email=path.email
      var pass=path.psw
      this.service.loginApi().subscribe((data:any)=>{
        // console.log(data);
        var admin_email=data[0].email
        var admin_psw=data[0].password
        if(email==admin_email){
          if(pass==admin_psw){
            localStorage.setItem("admin",JSON.stringify(data[0]))
            this.route.navigateByUrl("/home").then(()=>{
              this.ts.showSuccess("Logged In Successfully.")
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
          }else{
            this.ts.showWarning("Incorrect password")
          }
        }else{
          this.ts.showWarning("Incorrect Email")
        }
        
      })
    }
    else{
      this.ts.showError('Invalid form')
    }
  }
}
