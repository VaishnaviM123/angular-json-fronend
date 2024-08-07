import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private ts:ToastrService) { }

  showSuccess(msg:any){
    this.ts.success('Success',msg)
  }

  showError(msg:any){
    this.ts.error('Error',msg)
  }

  showWarning(msg:any){
    this.ts.warning('Warning',msg)
  }

}
