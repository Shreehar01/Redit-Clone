import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]>{
    return this.httpClient.get<CommentPayload[]>('user' + postId);
  }

  postComment(CommentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('user', CommentPayload);
  }

  getAllCommentsByUser(name: string){
    return this.httpClient.get<CommentPayload[]>('user' + name);
  }
}
