import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(photos: any, term: any): any {
    if (term === undefined) return photos;

    return photos.filter((photo) => {
      return photo.title.toLowerCase().includes(term.toLowerCase());
    });
  }

}
