import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/Category';

@Injectable()
export class CategoriesService {

  constructor(private httpClient: HttpClient) {
  }

  public search(query: any): Observable<Category[]> {
    return this.httpClient.get<Category[]>('api/categories/search', {
      params: query
    });
  }

  public create(model: Category): Observable<boolean> {
    return this.httpClient.post<boolean>('api/categories/create', model);
  }

  public delete(categoryId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>('api/categories/delete', {
      params: {id: categoryId}
    });
  }

  public update(model: Category): Observable<boolean> {
    return this.httpClient.put<boolean>('api/categories/update', {
      params: model
    });
  }

  public find(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>('api/categories/find', {params: {'id': categoryId}});
  }

}
