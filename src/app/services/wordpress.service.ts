import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, toArray } from 'rxjs/operators';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private apiUrl =
    'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/';

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient
      .get<any[]>(`${this.apiUrl}posts/?number=3`)
      .pipe(map((response: any) => [...response.posts]));
  }

  getComments(ids: number[]) {
    const comments = ids.map((id) => {
      return this.getCommentsByPostId(id);
    });

    return concat(...comments).pipe(
      toArray(),
      map((response) => response.map(({ comments }: any) => comments[0]))
    );
  }

  getCommentsByPostId(id: number) {
    return this.httpClient.get<any[]>(`${this.apiUrl}posts/${id}/replies/`);
  }
}
