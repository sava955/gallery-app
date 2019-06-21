import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album';
import { mergeMap, switchMap, map, filter } from 'rxjs/operators';
import { User } from '../models/user';
import { filterQueryId } from '@angular/core/src/view/util';
import { AlbumAndUser } from '../models/album-and-user';
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
  public getUser(userId: String): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId).pipe(filter(user => user['id'] === userId))
  }
  public getAlbums(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  public getMergedAlbums(): Observable<any> {
    const albums = this.getAlbums();
    const users = this.getUsers();
    const photos = this.getPhotos();
    const merged = forkJoin(albums, users, photos)
      .pipe(map(data => data[0].reduce((user, album, photo) => {
        debugger;
        const userId = data[1].find(user => user.id === album.userId);
        const albumId = data[2].find(album => album.id === photo.albumId);
        if (userId) {
          debugger;
          user.push({
            id: album.id,
            username: userId.name,
            title: album.title
          })
        }
        return user;
      }, new Array<AlbumAndUser>())));
      return merged;
  }

  public getAlbum(albumId: number): Observable<any> {
    debugger;
    return this.http.get
    (`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  }

  public getPhotos(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/photos');
  }

  /*public getMergedPhotos(albumId: number): Observable<any> {
    const albums = this.getAlbum(albumId);
    const photos = this.getPhotos();
    const merged = forkJoin(albums, photos)
      .pipe(map(data => data[0].reduce((photo, album) => {
        const albumPhoto = data[1].find(album => album.id === photo.albumId);
        if (albumPhoto) {
          debugger;
          photo.push({
            id: album.id,
            photoTitle: albumPhoto.title,
            title: album.title
          })
        }
        return photo;
      }, new Array<any>())));
      return merged;
  }*/

}
