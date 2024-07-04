import { Component } from '@angular/core';
import { JobService } from '../../shared/job.service';
import { Observable, tap } from 'rxjs';
import { Job } from '../../shared/model/job.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { JobElementListComponent } from '../../shared/job-element-list/job-element-list.component';
import { map, includes } from 'lodash';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JobElementListComponent, JobDetailsComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {

  jobs$: Observable<Job[]>;
  favIdsFromLocal = JSON.parse(localStorage.getItem('favorites') ?? '[]') as number[]; // if favorites doesn't exist will be empty number array, list from localStrorage otherwise

  constructor(private jobService: JobService) {
    this.jobs$ = this.jobService.jobs().pipe(tap((data: Job[]) => { // tap used to modify the objects' list
       map(data, (j: Job) => { // lodash map iterate the data array
        j.isFavorite = includes(this.favIdsFromLocal, j.id) ? true : false; // if fav from localStorage contains job.id isFavorite is true, false otherwise
      })
    }));
  }
}
