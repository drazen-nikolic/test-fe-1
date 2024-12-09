import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from './entity';
import { AppState } from '../app/state/app.state';

interface PostsResponse {
  posts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private appState: AppState
  ) {}

  fetchPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>('/api/posts').pipe(
      tap(response => this.appState.setPosts(response.posts))
    );
  }

}
