import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../users.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
  }

  users = [];

  ngOnInit(): void {
    this.getUsers();
  }
  // get user by id
  getUserObject(id: number): any {
    return  this.users.filter(user => user['id'] === id);
  }
  // get all users
  getUsers(): any {
    this.usersService.getUsers()
      .subscribe(
        (data: any) => {
          this.users = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  // delete user by id
  handleDeleteUser(data: any, id: number): any {
    this.usersService.deleteUser(id).subscribe(
      (deleted: any) => {
        const [deletedObj] = this.getUserObject(id);
        // @ts-ignore
        const index = this.users.indexOf(deletedObj, 0);
        this.users.splice(index, 1);
      },
      (error: any) => {
        console.log(error);
      },
    );
  }

}
