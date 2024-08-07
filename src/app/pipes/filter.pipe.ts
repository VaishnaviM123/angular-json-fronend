import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ExpArray:any[], filterString:string): any {
    if(!ExpArray || !filterString){
      return ExpArray
    }else{
      return ExpArray.filter((item:any)=>item.expenseType===filterString)
    }
  }

}
