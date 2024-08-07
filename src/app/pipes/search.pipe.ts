import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(ExpArray:any[], searchString:string): any {
    if(!ExpArray || !searchString){
      return ExpArray
    }else{
      return ExpArray.filter((data: any) => 
        (data.expenseType.trim().toLowerCase() + ' ' + data.description.trim().toLowerCase())
        .includes(searchString.trim().toLowerCase())
      );
          }
  }

}
