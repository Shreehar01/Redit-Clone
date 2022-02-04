import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }


  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post('jahdjah', votePayload);
  }
}
