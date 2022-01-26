import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {UserService} from "../../services/user.service";
import {Book} from "../../components/main/main.component";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {
  @Input() userInfo: any;
  @Input() booksData!: Book[];

  displayedColumns: string[] = ['book', 'name', 'author', 'year', 'favorite'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private userServise: UserService) {
  }

  ngOnInit() {
    this.booksData.forEach((book: Book) => {
        book.isFavorite = this.userInfo.favorites.includes(book._id);
    })
    this.dataSource = new MatTableDataSource(this.booksData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getOpacity(isFavourite: boolean) {
    return isFavourite ? 1 : 0.2;
  }
  favoriteClick(id: string) {
    this.userServise.changeUserFavorite(id).subscribe(res => {
    });
    this.booksData = this.booksData.map((book: Book) => {
      if (book._id === id) {
        book.isFavorite = !book.isFavorite;
      }
      return book;
    })
  }
}
