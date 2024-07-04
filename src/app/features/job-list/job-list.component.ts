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

  constructor(private jobService: JobService) {
    this.jobs$ = this.jobService.jobs().pipe(tap((data: Job[]) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
      return map(data, (j: Job) => {
        j.isFavorite = includes(favorites, j.id) ? true : false;
        return j
      })
    }));
  }

}
