import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class TweetsService {
  constructor(private httpClient: HttpClient) {
  }

  public search(keywords: string[]): Observable<any[]> {
    return this.httpClient.post<any[]>('/api/twitter/search', {keywords: keywords});
  }

}
