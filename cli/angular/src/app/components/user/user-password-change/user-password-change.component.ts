import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {PopUpComponent} from "../../../common/pop-up/pop-up.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent implements OnInit {

  public hide: any = {
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  };

  public passwordForm: FormGroup = new FormGroup(
    {
      password: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirmNewPassword: new FormControl("", [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  constructor(private userService: UserService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.userService
      .changePassword(this.passwordForm.value)
      .subscribe((result) => {
        this.dialogRef.open(PopUpComponent, {
          data: {
            message: "Password was successfully change",
            buttonText: "Ok",
            redirect: "/main",
          }
        });
      });
  }
}

const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get('newPassword')?.value;
  const confirmNewPassword = control.get('confirmNewPassword')?.value;
  return newPassword === confirmNewPassword ? null : { notmatched: true };
};

