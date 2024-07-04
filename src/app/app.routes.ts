import { Routes } from '@angular/router';
import { JobListComponent } from './features/job-list/job-list.component';
import { JobFavoritesComponent } from './features/job-favorites/job-favorites.component';
import { JobDetailsComponent } from './features/job-details/job-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: JobListComponent },
  { path: 'favorites', component: JobFavoritesComponent },
  { path: 'detail/:job', component: JobDetailsComponent },
];