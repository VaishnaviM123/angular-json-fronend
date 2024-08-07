import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  addExpenseForm: FormGroup;
  today: string;

  constructor(
    private fb: FormBuilder,
    private expenseService: AdminService,
    private router: Router,
    private ts:ToastService
  ) {
    this.addExpenseForm = this.fb.group({
      expenseType: ['', Validators.required],
      expenseDate: ['', Validators.required],
      expenseAmount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    });

    // Get today's date in YYYY-MM-DD format
    this.today = new Date().toISOString().split("T")[0];
  }

  onSubmit() {
    if (this.addExpenseForm.valid) {
      this.expenseService.addExpenseApi(this.addExpenseForm.value).subscribe(() => {
        this.router.navigate(['/home']);
        this.ts.showSuccess("Data Updated.");
      });
    }else{
      this.ts.showWarning('Invalid form, Fill all details')
    }
  }
}

