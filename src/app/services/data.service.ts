import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  usersUrl:string = 'https://my-json-server.typicode.com/michaeltarleton/json-server-sample-db/users';

  constructor(private http:HttpClient) { }
  // Get users
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}