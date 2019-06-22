import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Photos } from '../models/photos';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  album: any;
  user: any;
  photos: Photos[];

  constructor(private http: HttpClient) { 
  }

  public getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  public getAlbums(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  public getMergedAlbums(): Observable<any> {
    const albums = this.getAlbums();
    const users = this.getUsers();
    const merged = forkJoin(albums, users)
      .pipe(map(data => data[0].reduce((user, album, photo) => {
        debugger;
        const userId = data[1].find(user => user.id === album.userId);
        if (userId) {
          debugger;
          user.push({
            id: album.id,
            username: userId.name,
            title: album.title
          })
        }
        return user;
      }, new Array<any>())));
      return merged;
  }

  public getAlbumPhotos(albumId: number): Observable<any> {
    return this.http.get
    (`https://jsonplaceholder.typicode.com/photos`)
      .pipe(map(photos => {
        if (Array.isArray(photos)) {
          return photos.filter((photo) => photo['albumId'] == albumId);
        }
      })
    );
  }

}
