import { Component, Input } from '@angular/core';
import { Job } from '../model/job.interface';
import { JobService } from '../job.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-element-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './job-element-list.component.html',
  styleUrl: './job-element-list.component.css'
})
export class JobElementListComponent {
  private _job!: Job;

  @Input() set job(j: Job) {
    this._job = j;
  }
  get job() {
    return this._job;
  }
  @Input() isFromFavorites = false;

  constructor(private jobService: JobService) { }

  toggleFavorite() {
    this.job.isFavorite = this.job.isFavorite ? false : true;
    if(this.job.isFavorite) {
      this.jobService.addToFavorites(this.job.id);
    } else {
      this.jobService.removeFromFavorites(this.job.id);
    }
  }
}
