import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";

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

  isDataAvailable:boolean = false;
  booksData: any;
  constructor(private booksService: BooksService) {
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe(result => {
      this.booksData = result;
      this.isDataAvailable = true;
    })
  }

}
