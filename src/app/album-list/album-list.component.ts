import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, filter, map, mergeMap } from 'rxjs/operators';
import { getDefaultService } from 'selenium-webdriver/opera';
import { AlbumAndUser } from '../models/album-and-user';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];
  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAlbums();
  }

  /*async ngOnInit(): Promise<any> {
    // Make the HTTP request:
    const albums = await this.albumService.getAlbums().toPromise();
    const albumsWithUsers = [];
    for (let album of albums) {
      debugger;
      const user = await this.albumService.getUser(album['userId']).toPromise();
      const photos = await this.albumService.getPhotos().toPromise();
      albumsWithUsers.push(Object.assign(album, {user: user}, {photos: photos}));
    }
    console.log(albumsWithUsers);
    this.albums = albumsWithUsers;
  }*/


  
  getAlbums() {
    this.albumService.getMergedAlbums()
    .subscribe((albums) => {
      console.log(albums);
      this.albums = albums;
    })
  }

}
