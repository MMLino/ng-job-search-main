import { Component, Input, TemplateRef } from '@angular/core';
import { Job } from '../../shared/model/job.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JobService } from '../../shared/job.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetail$: Observable<Job>;
  // jobDescTemplate: TemplateRef<any> | null = null;
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private sanitizer: DomSanitizer
  ) {
    const id = this.route.snapshot.paramMap.get('job')!;
    this.jobDetail$ = this.jobService.job(parseInt(id)).pipe(
      tap(response => { console.log("Detail", response); })
    )
  }

  goBack() {
    history.back();
  }
}
