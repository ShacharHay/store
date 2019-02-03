import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Order} from '../models/Order';

@Injectable()
export class OrdersServices {

  constructor(private httpClient: HttpClient) {
  }

  public create(order: Order): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/orders/create', order);
  }
}
