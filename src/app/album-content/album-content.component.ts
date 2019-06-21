import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Photos } from '../models/photos';
import { tap, map, switchMap, flatMap, filter, mergeMap, subscribeOn } from 'rxjs/operators';
import { forkJoin, merge } from 'rxjs';

@Component({
  selector: 'app-album-content',
  templateUrl: './album-content.component.html',
  styleUrls: ['./album-content.component.css']
})
export class AlbumContentComponent implements OnInit {
  photos: any[];
  album: any;
  //private albumId: string;
  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      debugger;
      console.log(params);
      this.album = this.getAlbum(params['albumId']);
    });
    /*this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.albumId = paramMap.get('albumId');
      this.albumService.getPhotos(this.albumId)
        .subscribe(photoData => {
          this.photos = {
            id: photoData.id,
            title: photoData.title,
          }
        }) 
    })*/

    //this.getPhotos();
  }

  getAlbum(albumId: number) {
    this.albumService.getAlbum(albumId).subscribe(
      (album) => {
        debugger;
        console.log(album);
        this.album = album;
      }, (photos) => {
        this.photos = photos;
      });
  }


  getPhotos() {
    this.albumService.getPhotos().subscribe(
      (photos) => {
        console.log(photos);
        this.photos = photos;
      }
    )
  }

}
