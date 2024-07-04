import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { Job } from '../../shared/model/job.interface';
import { JobService } from '../../shared/job.service';
import { map as lMap, find } from 'lodash';
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
export class JobFavoritesComponent implements OnDestroy {
  jobs$: Observable<Job[] | null> = of([]);
  subscriptions = new Subscription();
  favFromLocal = JSON.parse(localStorage.getItem('favorites') ?? '[]') as number[];

  constructor(private jobService: JobService) {
    this.jobs$ = this._drawFavoritesList();
    
    this.subscriptions.add(
      this.jobService.favoritesUpdated.subscribe(() => {
        this.jobs$ = this._drawFavoritesList();
      })
    )
  }
  
  private _drawFavoritesList(): Observable<Job[] | null> {
    return this.jobService.jobs().pipe(map((data: Job[]) => { // map to return a new list (only favorites)
      const favWithStars = lMap(this.favFromLocal, jobId => {
        const job = find(data, { id: jobId})! as Job;
        job.isFavorite = true; 
        return job;
      }); // filtering jobs contains in favorites
      return favWithStars.length ? favWithStars : null 
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
