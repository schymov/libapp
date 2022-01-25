import { Component, OnInit } from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

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
    //test opening bookreader
    // this.bookreader('F1QDAAAAQAAJ');
  }
}
