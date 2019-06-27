import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Photos } from '../models/photos';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
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
export class AlbumListComponent implements OnInit {
  albums: any[] = [];
  photos: any[] = [];
  p1: number = 1;
  p2: number = 1;

  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAlbums();
    this.getPhotos();
  }
  
  getAlbums() {
    this.albumService.getMergedAlbums()
    .subscribe((albums) => {
      this.albums = albums;
    })
  }

  getPhotos() {
    this.albumService.getAllPhotos().subscribe(
      (photos) => {
        this.photos = photos;
      }
    )
  }

}
