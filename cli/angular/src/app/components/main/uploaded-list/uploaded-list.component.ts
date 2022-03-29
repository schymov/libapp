import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-uploaded-list',
  templateUrl: './uploaded-list.component.html',
  styleUrls: ['./uploaded-list.component.scss'],
})
export class UploadedListComponent implements OnInit {
  public uploadedList$: Observable<Array<string>> =
    this.uploadService.getUpload();

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  goToNewLocation(value: string): void {
    const newLocation = window.location.origin + value;
    window.location.replace(newLocation);
  }

  openBook(name: string) {
    window.open(`http://localhost:3000/upload/${name}`);
  }
}
