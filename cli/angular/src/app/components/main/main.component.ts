import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ImageService } from '../../services/image.service';

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
  imageURL: string = '';

  constructor(
    private booksService: BooksService,
    private userService: UserService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin([
      this.booksService.getAllBooks(),
      this.userService.getUserInfo(),
    ]).subscribe(([resultBooks, resultUser]) => {
      this.booksData = resultBooks;
      this.userInfo = resultUser;
      this.imageService.getImage(this.userInfo._id).subscribe((result) => {
        this.imageURL = result.toString();
        console.log(result);
      });
      this.isDataAvailable = true;
    });
  }

  goToNewLocation(value: string): void {
    const newLocation = window.location.origin + value;
    window.location.replace(newLocation);
  }
  signOut(): void {
    this.router.navigateByUrl('auth/signin');
    localStorage.removeItem('userInfo');
  }
}
