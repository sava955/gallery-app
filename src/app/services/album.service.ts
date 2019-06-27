import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, filter, tap, catchError } from 'rxjs/operators';
import { Photos } from '../models/photos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
        const userId = data[1].find(user => user.id === album.userId);
        if (userId) {
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

  public getAllPhotos(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos`);
  }

  public getPhoto(photoId: number): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  }

  public deletePhoto(photo: any | number): Observable<any> {
    const id = typeof photo === 'number' ? photo : photo.id;

    return this.http.delete(`https://jsonplaceholder.typicode.com/photos/${id}`, httpOptions).pipe(
      tap(() => console.log(`deleted photo id=${id}`))
    )
  }

}
