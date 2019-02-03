import {Injectable} from '@angular/core';
import {Product} from '../models/Product';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductsServices {

  constructor(private httpClient: HttpClient) {
  }

  public search(query: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>('api/products/search', {
      params: query
    });
  }

  public create(model: Product): Observable<boolean> {
    return this.httpClient.post<boolean>('api/products/create', model);
  }

  public delete(productId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>('api/products/delete', {
      params: {id: productId}
    });
  }

  public update(model: Product): Observable<boolean> {
    return this.httpClient.put<boolean>('api/products/update', {
      params: model
    });
  }

  public find(productId: string): Observable<Product> {
    return this.httpClient.get<Product>('api/products/find', {params: {'id': productId}});
  }

  public byCategory(): Observable<any> {
    return this.httpClient.get<any>('api/products/byCategories');
  }

  public incrementProductView(productId: string): void {
    this.httpClient.post<any>('api/products/incrementProductView', {'id': productId}).subscribe();
  }

  public getProductCounter(productId: string): Observable<number> {
    return this.httpClient.get<number>('api/products/productCounter', {params: {'id': productId}});
  }
}
