import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Store} from '../models/Store';

@Injectable()
export class StoresService {

  constructor(private httpClient: HttpClient) {
  }

  public search(query: any): Observable<Store[]> {
    return this.httpClient.get<Store[]>('/api/stores/search', {params: query});
  }

  public storesCitiesCount(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/stores/storesCitiesCount');
  }
}
