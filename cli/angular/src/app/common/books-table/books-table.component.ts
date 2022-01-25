import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {FavoritesService} from "../../services/favorites.service";

interface Book {
  name: string,
  author: string,
  year: string,
  img: string,
  id: string,
  _id: string,
  isActive: boolean,
  isFavorite: boolean,
}

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {
  @Input() userInfo: any;
  @Input() booksData: any;

  displayedColumns: string[] = ['book', 'name', 'author', 'year', 'favorite'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private favoritesServise: FavoritesService) {
  }

  ngOnInit() {
    this.booksData.forEach((book: Book) => {
        book.isFavorite = this.userInfo.favorites.includes(book.id);
    })
    this.dataSource = new MatTableDataSource(this.booksData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.booksData);
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
  favoriteClick(target: any, id: string) {
    this.favoritesServise.changeUserFavorite(id);
    let opacity = target.querySelector('mat-icon').style.opacity;
    if (opacity === "1") {
      target.querySelector('mat-icon').style.opacity = 0.2;
    } else if (opacity === "0.2") {
      target.querySelector('mat-icon').style.opacity = 1;
    }
  }
}
