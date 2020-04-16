import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'

import { TVShow, Filter, Pagination, SortBy, Sort, Genre } from './../common/interfaces'
import { Genres, Years, FilterDefault, PaginationDefault } from './../common/common';
import { TVShowsService } from './../shared/tv-shows.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  tvSub: Subscription
  form: FormGroup
  filter: Filter = FilterDefault
  pagination: Pagination = PaginationDefault
  genres: Genre[] = Genres
  years: string[] = Years

  tvShows$: Observable<TVShow[]>
  constructor(private tvShowsService: TVShowsService) { }

  ngOnInit(): void {
    this.tvShows$ = this.tvShowsService.getShows()

    this.form = new FormGroup({
      name: new FormControl(null),
      genre: new FormControl('all'),
      year: new FormControl('all')
    })

    this.form.valueChanges.subscribe(form => {
      this.filter = { ...form }

      if (this.pagination.page !== 1){
        this.pagination = {
          ...this.pagination,
          page: 1
        }
      }
    })

    this.tvSub = this.tvShows$.subscribe((tvShows: TVShow[]) => {
      if (this.pagination.size !== tvShows.length) {
          this.pagination = {
          ...this.pagination,
          size: tvShows.length
        }
      }
    })

    this.tvShowsService.size$.subscribe((size: number) => {
      if (this.pagination.size !== size) {
        this.pagination = {
          ...this.pagination,
          size: size
        }
      }
    })
  }

  onPageChange(pagination: Pagination) {
    this.pagination = { ...pagination }
  }

  getColor(genre: string): string {
    return Genres.filter(r => r.id === genre)[0].color
  }

  selectSort(sortBy: SortBy, event) {
    this.cancelEvent(event)

    let sort: Sort = this.pagination.sortBy === sortBy ? (this.pagination.sort === Sort.ASC ? Sort.DESC : Sort.ASC) : Sort.ASC

    this.pagination = {
      ...this.pagination,
      sortBy: sortBy,
      sort: sort
    }
  }

  selectGenre(genre: string, event) {
    this.cancelEvent(event)

    if(this.filter.genre !== genre) {
      this.form.controls['genre'].setValue(genre)
    }
  }

  cancelEvent(event) {
    event.preventDefault()
  }

  ngOnDestroy(): void {
    if (this.tvSub) {
      this.tvSub.unsubscribe()
    }
  }
}
