import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Post, PostWithAuthor } from '../../posts/entity';
import { User } from '../../users/entity';

@Injectable({
  providedIn: 'root'
})
export class AppState {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private usersSubject = new BehaviorSubject<User[]>([]);

  posts$ = this.postsSubject.asObservable();
  users$ = this.usersSubject.asObservable();

  // Combined state of posts with authors
  postsWithAuthors$ = combineLatest([this.posts$, this.users$]).pipe(
    map(([posts, users]) => {
      return posts.map(post => ({
        ...post,
        author: users.find(user => user.userId === post.authorId)?.name
      }));
    })
  );

  setPosts(posts: Post[]) {
    this.postsSubject.next(posts);
  }

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  getPosts(): Observable<PostWithAuthor[]> {
    return this.postsWithAuthors$;
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }
}
