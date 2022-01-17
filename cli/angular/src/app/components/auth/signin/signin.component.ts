import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public hide: boolean = true;
  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    // this.testService.get().subscribe((result) => console.log(result));
  }

  signIn() {
    console.log(this.authForm.value);
  }
}
