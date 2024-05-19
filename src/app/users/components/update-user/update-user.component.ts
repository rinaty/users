import { Component, OnDestroy, OnInit } from '@angular/core';
import { usersService } from '../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormField } from 'src/app/core/model/form-field';
import { IUser } from '../../model/user.interface';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { VALIDATOR_TYPE } from 'src/app/core/enum/validator-type';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  currentUser: IUser | null = null;
  formFields: IFormField[] = [];
  form!: FormGroup;
  required = Validators.required;
  isUserUpdated = false;

  constructor(private router: Router,
    private usersService: usersService) {
  }

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();
    this.loadUserForm();
  }

  loadUserForm() {
    this.usersService.loadUserForm()
      .pipe(take(1))
      .subscribe(res => {
        this.formFields = res.form_fields.sort((a,b) => a.order - b.order);
        this.form = this.toFormGroup(res.form_fields);
      })
  }

  toFormGroup(fields: IFormField[]) {
    const group: any = {};
    fields.forEach(field => {
      let value = this.currentUser ? (this.currentUser as any)[field.key] : '';
      group[field.key] = new FormControl(value || '', this.getValidation(field.validators));
    });
    return new FormGroup(group);
  }

  getValidation(validators:string[]) {
    let res:any[] = [];
    validators.forEach(validator => {
      if (validator === VALIDATOR_TYPE.REQUIRED) {
        res.push(Validators.required);
      }
      else if (validator === VALIDATOR_TYPE.EMAIL) {
        res.push(Validators.email);
      }
      else if (validator === VALIDATOR_TYPE.PHONE) {
        res.push(Validators.pattern('[- +()0-9]{10,12}'));
      }
    });
    return res;
  }

  saveUserDetails() {
    let user = this.form.getRawValue() as IUser;
    if (!this.currentUser) {
      this.usersService.addNewUser(user);
    } else {
      this.usersService.updateUser(this.currentUser, user);
    }
    this.isUserUpdated = true;
    setTimeout(() => {
      this.isUserUpdated = false
    }, 1500);
  }

  goBackToList() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.usersService.setCurrentUser(null);
  }
}
