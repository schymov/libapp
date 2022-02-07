import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

export interface Book {
  name: string;
  author: string;
  year: string;
  img: string;
  id: string;
  _id: string;
  isActive: boolean;
  isFavorite: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  booksData!: Book[];
  userInfo: any;
  isDataAvailable: boolean = false;

  constructor(
    private booksService: BooksService,
    private userServise: UserService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin([
      this.booksService.getAllBooks(),
      this.userServise.getUserInfo(),
    ]).subscribe(([resultBooks, resultUser]) => {
      this.booksData = resultBooks;
      this.userInfo = resultUser;
      this.isDataAvailable = true;
    });
  }
  getFromLocalStorage(key: string): any {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : null;
  }
}
