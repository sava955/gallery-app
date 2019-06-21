import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumContentComponent } from './album-content/album-content.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListComponent },
  { path: ':albumId/photos', component: AlbumContentComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
