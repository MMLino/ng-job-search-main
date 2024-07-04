import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { Job } from '../../shared/model/job.interface';
import { JobService } from '../../shared/job.service';
import { map as lMap, find, filter, includes } from 'lodash';
import { AsyncPipe, CommonModule } from '@angular/common';
import { JobElementListComponent } from '../../shared/job-element-list/job-element-list.component';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-job-favorites',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JobElementListComponent, JobDetailsComponent],
  templateUrl: './job-favorites.component.html',
  styleUrl: './job-favorites.component.css'
})
export class JobFavoritesComponent { // OLD --> implements OnDestroy {
  jobs$: Observable<Job[] | null>;
  // OLD --> subscriptions = new Subscription(); // subscriptions container to unsubscribe as the component destroy
  favIdsFromLocal = JSON.parse(localStorage.getItem('favorites') ?? '[]') as number[]; // if favorites doesn't exist will be empty number array, list from localStrorage otherwise

  constructor(private jobService: JobService) {
    this.jobs$ = this._drawFavoritesList(); // jobs observable init
    
    // start - OLD
    // // listener for fav updates
    // this.subscriptions.add(
    //   this.jobService.favoritesUpdated.subscribe(() => { // triggered from JobService when fav. list change during the fav. component's navigation
    //     this.jobs$ = this._drawFavoritesList(); // jobs observable update
    //   })
    // );
    // end - OLD
  }
  
  // start - OLD
  // private _drawFavoritesList(): Observable<Job[] | null> {
  //   return this.jobService.jobs().pipe(map((data: Job[]) => { // map to return a new list (only favorites)
  //     const favJobs = filter(data, d => includes(this.favIdsFromLocal, d.id)); // filtering jobs contains in favorites
  //     const favWithStars = lMap(favJobs, job => {
  //       job.isFavorite = true; // set isFavorite boolean as true to see the star active into list
  //       return job;
  //     });
  //     return favWithStars.length ? favWithStars : null; // if fav is empty return a null value, fav job list otherwise
  //   }));
  // }
  // end - OLD
  private _drawFavoritesList(): Observable<Job[] | null> {
    return this.jobService.jobs().pipe(map((data: Job[]) => { // map used to modify the list. needed to return only favorites
      const favs = filter(data, d => includes(this.favIdsFromLocal, d.id)); // filtering jobs retrieved
      return favs.length ? favs : null; // if favs is empty return a null value, favs otherwise
    }));
  }

  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }
}
