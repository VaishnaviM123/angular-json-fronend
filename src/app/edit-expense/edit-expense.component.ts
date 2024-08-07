import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent {
  id:any=""
  expData:any={}
  today:string=""

  constructor(private ar:ActivatedRoute, private es:AdminService, private rout:Router, private ts:ToastService){ }

  ngOnInit(): void {
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
    this.ar.params.subscribe((res)=>{
      this.id=res['id']
      // console.log(this.id);
      this.es.getsingleExpenseApi(this.id).subscribe((res)=>{
        this.expData=res
        // console.log(this.expData);
      })
    })
  }

  update(){
    // Correct validation logic
    const isAmountValid = this.expData.expenseAmount !== null && this.expData.expenseAmount !== undefined && this.expData.expenseAmount !== "";
    const isDescriptionValid = this.expData.description !== null && this.expData.description !== undefined && this.expData.description.trim() !== "";
    const isTypeValid = this.expData.expenseType !== "";
    const isDateValid = this.expData.expenseDate !== "";
  
    if(isAmountValid && isTypeValid && isDateValid && isDescriptionValid) {
      this.es.editExpenseApi(this.expData, this.id).subscribe((data) => {
        this.rout.navigateByUrl("/home");
        this.ts.showSuccess("Data Updated.");
      });
    } else {
      this.ts.showWarning("Fill All data!");
    }
  }
  
}

