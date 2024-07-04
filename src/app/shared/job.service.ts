import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Job } from './model/job.interface';

import { template } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _baseURL = "/jobs";
  private _URLbyID = this._baseURL.concat("/<%= job %>");
  private _favorites: Set<number>; // object used to store all the favorites job
  // OLD --> favoritesUpdated = new Subject<void>(); // Subject used to manage the favorites update into component 

  constructor(private httpClient: HttpClient) { // inject HttpClient to perform all the APIs calls
    this._favorites = new Set(JSON.parse(localStorage.getItem('favorites') ?? '[]')); // set the favorites with value retrieved from localStorage if exist
  }

  jobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this._baseURL); // request in get to retrieve all the jobs 
  }

  job(id: number): Observable<Job> {
    const compiled = template(this._URLbyID);
    const URL = compiled({job: id}); // with the template and compiled methods the job.id replace the placeholder '<%= job %>'
    
    return this.httpClient.get<Job>(URL); // as per the job method, this is the request in get. but the difference is that this request return a single job object as a detail 
  }

  // used to add into Set instance the new job.id (as per Set type all the values are uniq)
  addToFavorites(id: number) {
    this._favorites.add(id);
    this._writeIntoLocalStorage();
  }

  // used to remove from Set instance the requested job.id
  removeFromFavorites(id: number) {
    this._favorites.delete(id);
    this._writeIntoLocalStorage();
  }

  private _writeIntoLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this._favorites))); // transform the Set in an Array and save it into localStorage with key "favorites"
    // OLD --> this.favoritesUpdated.next(); // trigger the favorites list update
  }

}
