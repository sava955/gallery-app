import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumContentComponent } from './album-content/album-content.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListComponent },
  { path: ':albumId/photos', component: AlbumContentComponent },
  { path: ':photoId', component: PhotoComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
