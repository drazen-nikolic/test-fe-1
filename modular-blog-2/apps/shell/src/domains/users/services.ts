import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './entity';
import { AppState } from '../app/state/app.state';

interface UsersResponse {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private appState: AppState
  ) {}

  fetchUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('/api/users').pipe(
      tap(response => this.appState.setUsers(response.users))
    );
  }
}
