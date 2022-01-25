import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {FavoritesService} from "../../services/favorites.service";

interface Book {
  "_id": {
    "$oid": "61ea992d29464df0d923b371"
  },
  "name": string,
  "author": string,
  "year": string,
  "img": string,
  "id": string
}

declare const google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  isBooksDataAvailable:boolean = false;
  booksData: any;
  isUserDataAvailable:boolean = true;
  userInfo: any;
  isDataAvailable:boolean = false;

  constructor(private booksService: BooksService, private favoritesServise: FavoritesService) {
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

  ngOnInit(): void {
    this.getAllBooks();
    this.userInfo = {
      favorites: [
        "mhNAAAAAYAAJ",
        "dhjuAAAAMAAJ",
      ]
    };
/*    this.getUserInfo();*/
    //test opening bookreader
    // this.bookreader('F1QDAAAAQAAJ');
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe(result => {
      this.booksData = result;
      this.isBooksDataAvailable = true;
      this.isDataAvailable = this.isBooksDataAvailable && this.isUserDataAvailable;
    })
  }
  getUserInfo() {
    this.favoritesServise.getUserInfo().subscribe(result => {
      this.userInfo = result;
      this.isUserDataAvailable = true;
    })
  }
}
