import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public hide: HideType = {
    password: true,
    confirmPassword: true,
  };

  public authForm: FormGroup = new FormGroup(
    {
      username: new FormControl('Unknown user', [Validators.nullValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  constructor() {}

  ngOnInit(): void {}

  signUp() {
    console.log(this.authForm.value);
  }
}

interface HideType {
  password: boolean;
  confirmPassword: boolean;
}

// password matching check
const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { notmatched: true };
};
