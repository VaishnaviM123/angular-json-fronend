import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl="https://angular-json.onrender.com"

  constructor(private http:HttpClient) { }

  loginApi(){
    return this.http.get(`${this.baseUrl}/users`)
  }

  editProfileApi(bodyData:any){
    return this.http.put(`${this.baseUrl}/users/1`,bodyData)
  }

  getAllExpenseApi(){
    return this.http.get(`${this.baseUrl}/expenses`)
  }

  getsingleExpenseApi(id:any){
    return this.http.get(`${this.baseUrl}/expenses/${id}`)
  }

  addExpenseApi(bodyData:any){
    return this.http.post(`${this.baseUrl}/expenses`,bodyData)
  }

  editExpenseApi(bodyData:any,id:any){
    return this.http.put(`${this.baseUrl}/expenses/${id}`,bodyData)
  }

  deleteExpenseApi(id:any){
    return this.http.delete(`${this.baseUrl}/expenses/${id}`)
  }

}
