import { Component, OnInit } from '@angular/core';
import { TestService } from "../services/test.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private testService:TestService) {

  }

  ngOnInit(): void {
    this.testService.get().subscribe(
      result => console.log(result)
    )
  }
}
