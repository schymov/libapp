import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface Data {
  message: string;
  buttonText: string;
  redirect: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  message;
  button;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private router: Router) {
    this.message = data.message;
    this.button = data.buttonText;
  }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigateByUrl(this.data.redirect)
  }

}
