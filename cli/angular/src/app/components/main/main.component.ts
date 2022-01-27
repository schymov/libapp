import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { UserService } from "../../services/user.service";
import { forkJoin } from 'rxjs';

export interface Book {
  name: string,
  author: string,
  year: string,
  img: string,
  id: string,
  _id: string,
  isActive: boolean,
  isFavorite: boolean,
}

declare const google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  booksData!: Book[];
  userInfo: any;
  isDataAvailable: boolean = false;

  constructor(private booksService: BooksService, private userServise: UserService) {
  }

  ngOnInit(): void {
    this.getData();
    //test opening bookreader
    //this.bookreader('F1QDAAAAQAAJ');
  }

  getData() {
    forkJoin(
      [this.booksService.getAllBooks(),
        this.userServise.getUserInfo()]
    ).subscribe(([resultBooks, resultUser]) => {
      this.booksData = resultBooks;
      this.userInfo = resultUser;
      this.isDataAvailable = true;
    })
  }
  bookreader(id: string) {
    google.books.load();

    function initialize(id: string) {
      const viewer = new google.books.DefaultViewer(
        document.getElementById('viewerCanvas')
      );
      viewer.load(id);
    }
    google.books.setOnLoadCallback(() => initialize(id));
  }
}
