import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photo: any;

  constructor(private albumService: AlbumService, 
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.photo = this.getPhoto(params['photoId']);
    });
  }

  getPhoto(photoId: number) {
    this.albumService.getPhoto(photoId).subscribe(
      (photo: any) => 
      this.photo = photo
    )
  }

  goBack() {
    this.location.back();
  }

}
