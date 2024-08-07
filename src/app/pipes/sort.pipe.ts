import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(expArray: any[], sortData: boolean): any[] {
    console.log('Original array:', expArray);
    console.log('Sort data:', sortData);
  
    if (!expArray || sortData === undefined) {
      return expArray;
    } else {
      return expArray.sort((a: any, b: any) => {
        const dateA = new Date(a.expenseDate);
        const dateB = new Date(b.expenseDate);
        console.log('Sorting by:', sortData ? 'Descending' : 'Ascending');
        return sortData ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
    }
  }

}
