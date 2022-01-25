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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBooksDataAvailable:boolean = false;
  booksData: any;
  isUserDataAvailable:boolean = true;
  userInfo: any;
  isDataAvailable:boolean = false;

  constructor(private booksService: BooksService, private favoritesServise: FavoritesService) {
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
