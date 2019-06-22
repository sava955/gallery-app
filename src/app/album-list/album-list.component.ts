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
  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAlbums();
  }
  
  getAlbums() {
    this.albumService.getMergedAlbums()
    .subscribe((albums) => {
      console.log(albums);
      this.albums = albums;
    })
  }

}
