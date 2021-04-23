import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }
  baseUrl = 'http://localhost:3000/users';
  // get all users
  getUsers(): any {
    return this.http.get(this.baseUrl);
  }
  // get user by id
  getUser(id: number): any {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  // add new user
  addUser(user: object): any {
    return this.http.post(this.baseUrl, user);
  }
  // delete user
  deleteUser(id: number): any {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // update user
  updateUser(id: number, data: object): any {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

}
