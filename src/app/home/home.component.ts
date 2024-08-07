import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allExpenses:any=[]
  searchString:string=""
  filterString:string=""
  sortData:any=false
  p:number=1
  constructor(private s:AdminService, private ts:ToastService) { }

  ngOnInit(): void {
    this.getAllExpenses()
  }

  getAllExpenses(){
    this.s.getAllExpenseApi().subscribe((data)=>{
      // console.log(data);
      this.allExpenses=data
    })
  }

  deleteOne(id:any){
    this.s.deleteExpenseApi(id).subscribe((res)=>{
      this.getAllExpenses()
      this.ts.showSuccess("Data deleted.")
    })
  }

  changeFilter(data:string){
    this.filterString=data
  }

  changeSort(){
    this.sortData=!this.sortData
  }

}
