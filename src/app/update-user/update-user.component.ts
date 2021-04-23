import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: []
})
export class UpdateUserComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }

  id = 0;
  firstName = '';
  lastName = '';
  age = null;
  phone = '';
  userData: object = {};

  firstNameError = false;
  lastNameError = false;
  ageError = false;
  phoneError = false;
  serverError = false;

  // Validation
  formValidation = new FormGroup({
    firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ],
    ),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    age: new FormControl(0, [
      Validators.required,
      Validators.min(18),
      Validators.max(50)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/([0-9]){11}/),
    ])
  });

  ngOnInit(): void {
    // fetch old user data
    this.usersService.getUser(this.id).subscribe(
      (data: any) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.phone = data.phone;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  handleUpdateUser(): any {
    this.firstNameError = this.lastNameError = this.ageError = this.phoneError = this.serverError = false;
    if (this.formValidation.valid) {
      this.userData = {firstName: this.firstName, lastName: this.lastName, age: this.age, phone: this.phone};
      this.updateUserData(this.id, this.userData);
    } else {
      // check each input error
      if (!this.formValidation.controls.firstName.valid) {
        this.firstNameError = true;
      }
      if (!this.formValidation.controls.lastName.valid) {
        this.lastNameError = true;
      }
      if (!this.formValidation.controls.age.valid) {
        this.ageError = true;
      }
      if (!this.formValidation.controls.phone.valid) {
        this.phoneError = true;
      }
    }
  }

  updateUserData(id: number, userData: object): any {
    return this.usersService.updateUser(id, userData).subscribe(
      (data: any) => {
        this.router.navigate(['']);
      },
      (error: any) => {
        this.serverError = true;
        console.log(error);
      }
    );
  }

}
