import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent {
  constructor(private usersService: UsersService, private router: Router) {
  }

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

  handleAddingUser(): any {
    this.firstNameError = this.lastNameError = this.ageError = this.phoneError = this.serverError = false;
    if (this.formValidation.valid) {
      this.userData = {firstName: this.firstName, lastName: this.lastName, age: this.age, phone: this.phone};
      // console.log(this.userData);
      this.saveNewData(this.userData);
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

  saveNewData(userData: object): any {
    return this.usersService.addUser(userData).subscribe(
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
