import { Component } from '@angular/core';
import { Job } from '../../shared/model/job.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JobService } from '../../shared/job.service';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetail$: Observable<Job>;
  
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) {
    const id = this.route.snapshot.paramMap.get('job')!; // retrieve job id from URL

    // call to job service to retrieve job's details
    this.jobDetail$ = this.jobService.job(parseInt(id)).pipe(
      tap(response => { console.log("Job details", response); }) // simple details log
    )
  }

  // used to go back to the page which open the job details
  goBack() {
    history.back(); // I'm using history obj to go back to the previous list page (list or favorites) before the details page
  }
}
