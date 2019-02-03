import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'viewspipe'})
export class ViewsPipe implements PipeTransform {
  transform(views: number) {
    return views + ' Views';
  }

}
