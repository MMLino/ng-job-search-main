import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Job } from './model/job.interface';

import { template } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _baseURL = "/jobs";
  private _URLbyID = "/jobs/<%= job %>"
  private _favorites: Set<number>;
  favoritesUpdated = new Subject<void>();

  constructor(private httpClient: HttpClient) { 
    this._favorites = new Set(JSON.parse(localStorage.getItem('favorites') ?? '[]'));
  }

  jobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this._baseURL);
  }

  job(id: number | null): Observable<Job> {
    if(!id) {
      throw new HttpErrorResponse({error: 'Job not found'})
    }
    const compiled = template(this._URLbyID);
    const URL = compiled({job: id});
    // return this.httpClient.get<Job>(URL, { params: { id: id}});
    return this.httpClient.get<Job>(URL);
  }

  addToFavorites(id: number) {
    this._favorites.add(id);
    this._writeIntoLocalStorage();
  }

  removeFromFavorites(id: number) {
    this._favorites.delete(id);
    this._writeIntoLocalStorage();
  }

  private _writeIntoLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this._favorites)));
    this.favoritesUpdated.next();
  }

}
