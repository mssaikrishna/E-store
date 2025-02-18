import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true, // Mark the pipe as standalone
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterTerm: string): any[] {
    if (!items || !filterTerm) {
      return items; // Return all items if no search term is provided
    }

    filterTerm = filterTerm.toLowerCase();
    
    return items.filter(item => {
      return item.category?.name.toLowerCase().includes(filterTerm)});
  }
}
