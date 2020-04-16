import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { TVShow } from '../common/interfaces';

@Injectable({providedIn: 'root'})
export class TVShowsService {
  private _jsonURL = 'assets/data.json';
  public size$ = new Subject<number>()
  constructor(private httpClient: HttpClient) { }

  getShows(): Observable<TVShow[]> {
    return this.httpClient.get<TVShow[]>(this._jsonURL)
  }

  setSize(size: number) {
    this.size$.next(size)
  }
}
