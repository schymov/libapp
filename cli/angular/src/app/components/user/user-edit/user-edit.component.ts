import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../common/pop-up/pop-up.component';

interface userInfo {
  email: string;
  favorites: string[];
  pwd: string;
  username: string;
  _id: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.nullValidator]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    gender: new FormControl(null, [Validators.nullValidator]),
    birthdate: new FormControl(null, [Validators.nullValidator]),
    avatar: new FormControl(null, [Validators.nullValidator]),
  });
  startValue!: any;
  saveButtonDisabled: boolean = true;
  imageURL: string = '';
  userInfo!: any;
  maxDate: Date = new Date();
  constructor(private userService: UserService, private dialogRef: MatDialog) {
    this.getUserData();
  }

  ngOnInit(): void {}

  getUserData() {
    this.userService.getUserInfo().subscribe((result) => {
      this.userInfo = result;
      this.userForm.patchValue({
        username: this.userInfo.username,
        email: this.userInfo.email,
      });
      this.startValue = this.userForm.value;
      this.userForm.valueChanges.subscribe((result) => {
        this.saveButtonDisabled = this.startValue === result;
      });
    });
  }

  showPreview(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveChanges() {
    this.userService.changeUserInfo(this.userForm.value).subscribe((result) => {
      this.dialogRef.open(PopUpComponent, {
        data: {
          message: 'Changes was successfully saved',
          buttonText: 'Ok',
          redirect: '/main',
        },
      });
    });
  }
  goToMain() {
    const mainLocation = window.location.origin + '/main';
    window.location.replace(mainLocation);
  }
}
