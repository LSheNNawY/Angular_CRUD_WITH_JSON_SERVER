import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit {

  constructor(route: ActivatedRoute, private usersService: UsersService) {
    this.userId = route.snapshot.params.id;
  }

  userId: number;
  userData: any = {};

  ngOnInit(): void {
    this.usersService.getUser(this.userId).subscribe(
      (data: any) => { this.userData = data; },
      (error: any) => { console.log(error); }
    );
  }

}
