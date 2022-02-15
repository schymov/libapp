import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../../../common/pop-up/pop-up.component";
import { ImageService } from "../../../services/image.service";

interface userInfo {
  email: string,
  favorites: string[],
  pwd: string,
  username: string,
  _id: string,
  gender: string,
  birthdate: string,
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  public userForm: FormGroup = new FormGroup(
    {
      username: new FormControl(null, [Validators.nullValidator]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl( null, [Validators.nullValidator]),
      birthdate: new FormControl(null, [Validators.nullValidator]),
      avatar: new FormControl("", [Validators.nullValidator]),
    }
  );
  startValue!: userInfo;
  saveButtonDisabled: boolean = true;
  image!: any;
  imageURL: string = "";
  userInfo!: any;
  maxDate: Date = new Date();
  constructor(private userService: UserService, private imageService: ImageService, private router: Router, private dialogRef: MatDialog) {
    this.getUserData();
  }

  ngOnInit(): void {}

  getUserData() {
    this.userService.getUserInfo().subscribe((result) => {
      this.userInfo = result;
      this.userForm.patchValue({
        username: this.userInfo.username,
        email: this.userInfo.email,
        gender: this.userInfo.gender,
        birthdate: this.userInfo.birthdate,
      });
      this.imageService.getImage(this.userInfo._id).subscribe(result => {
        this.imageURL = result.toString();
      });
      this.startValue = this.userForm.value;
      this.userForm.valueChanges.subscribe((result) => {
        this.saveButtonDisabled = this.startValue === result;
      });
    });
  }

  showPreview(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(this.image);
    }
  }

  saveChanges() {
    this.imageService.addImage(this.userInfo._id, this.image);
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
