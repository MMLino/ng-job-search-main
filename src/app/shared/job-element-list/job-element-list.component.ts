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

  @Input() set job(j: Job) { // input used as setter to keep the job instance and perform some business logic if needed 
    this._job = j;
  }
  get job() { // job getter
    return this._job;
  }
  @Input() isFromFavorites = false; // input used to hide the stars when the list element need to be displayed into the favorites page

  constructor(private jobService: JobService) { }

  // toggle method for active info 
  toggleFavorite() {
    this.job.isFavorite = this.job.isFavorite ? false : true; // used to update the UI at runtime and display star as active or not
    if(this.job.isFavorite) {
      this.jobService.addToFavorites(this.job.id); // add job id to localStorage
    } else {
      this.jobService.removeFromFavorites(this.job.id); // remove job id from localStorage
    }
  }
}
