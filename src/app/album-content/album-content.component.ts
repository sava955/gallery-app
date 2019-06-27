import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-album-content',
  templateUrl: './album-content.component.html',
  styleUrls: ['./album-content.component.css'],
  animations: [
      trigger('flyInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition('void => *', [
          style({ transform: 'translateX(-100%)' }),
          animate(100)
        ]),
        transition('* => void', [
          animate(100, style({ transform: 'translateX(100%)' }))
        ])
      ])
    ]
})
export class AlbumContentComponent implements OnInit {
  @Input() sarchPhoto: any;
  photos: any[] = [];
  photo: any;

  constructor(
    private albumService: AlbumService, 
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getAlbum(params['albumId']);
    });
  }

  getAlbum(albumId: number) {
    this.albumService.getAlbumPhotos(albumId).subscribe(
      (photos) => {
        this.photos = photos;
      });
  }

  goBack() {
    this.location.back();
  }

  deletePhoto(photo: any) {
    this.photos = this.photos.filter(p => p !== photo);
    this.albumService.deletePhoto(photo).subscribe();
  }

}
