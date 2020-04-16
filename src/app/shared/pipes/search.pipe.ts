import { Pipe, PipeTransform } from '@angular/core';

import { TVShow, Pagination, Filter, Sort } from './../../common/interfaces';
import { TVShowsService } from './../tv-shows.service';

@Pipe({
  name: 'searchTVShows'
})
export class SearchPipe implements PipeTransform {

  constructor(private tvShowsService: TVShowsService) {
  }
  transform(tvShows: TVShow[], filter: Filter, pagination: Pagination): TVShow[] {

    // Filter
    let shows = this.filterTVShows(tvShows, filter)

    // Sorting
    shows = this.sortTVShows(shows, pagination)

    // Size Arr
    this.tvShowsService.setSize(shows.length)

    // Pagination
    shows = shows.slice(pagination.limit * (pagination.page - 1), pagination.limit * pagination.page)

    return shows;
  }

  private filterTVShows(tvShows: TVShow[], filter: Filter): TVShow[] {
    let shows = tvShows

    // Filter by Name
    if (filter.name != null && filter.name.trim()) {
      shows = shows.filter((show: TVShow) => {
        return show.name.toLowerCase().includes(filter.name.toLowerCase())
      })
    }

    // Filter By Genre
    if (filter.genre !== 'all'){
      shows = shows.filter((show: TVShow) => {
        return show.genres.includes(filter.genre)
      })
    }

    // Filter By Year
    if (filter.year !== 'all'){
      shows = shows.filter((show: TVShow) => {
        var year = new Date(show.date).getFullYear()

        if (year == +filter.year)
          return show
      })
    }

    return shows
  }

  private sortTVShows(tvShows: TVShow[], pagination: Pagination): TVShow[] {
    let shows = tvShows

    if(pagination.sortBy == 0) { // SortBy.Name
      if (pagination.sort == Sort.ASC) {
        shows = shows.sort((tv1, tv2) => {
          var nameA = tv1.name.toUpperCase();
          var nameB = tv2.name.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
      } else {
        shows = shows.sort((tv1, tv2) => {
          var nameA = tv1.name.toUpperCase();
          var nameB = tv2.name.toUpperCase();
          return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
        })
      }
    } else if (pagination.sortBy == 1) { // SortBy.Season
      if (pagination.sort === Sort.ASC) {
        shows = shows.sort((tv1, tv2) => tv1.season - tv2.season)
      } else {
        shows = shows.sort((tv1, tv2) => tv2.season - tv1.season)
      }
    } else if (pagination.sortBy == 2) { // SortBy.Network
      if (pagination.sort === Sort.ASC) {
        shows = shows.sort((tv1, tv2) => {
          var nameA = tv1.networks.sort((net1, net2) => {
            var nameA = net1.toUpperCase();
            var nameB = net2.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
          })[0].toUpperCase();

          var nameB = tv2.networks.sort((net1, net2) => {
            var nameA = net1.toUpperCase();
            var nameB = net2.toUpperCase();
            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
          })[0].toUpperCase();

          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
      } else {
        shows = shows.sort((tv1, tv2) => {
          var nameA = tv1.networks.sort((net1, net2) => {
            var nameA = net1.toUpperCase();
            var nameB = net2.toUpperCase();
            return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
          })[0].toUpperCase();

          var nameB = tv2.networks.sort((net1, net2) => {
            var nameA = net1.toUpperCase();
            var nameB = net2.toUpperCase();
            return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
          })[0].toUpperCase();

          return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
        })
      }
    } else {  // SortBy.Premiere
      if (pagination.sort === Sort.ASC) {
        shows = shows.sort((tv1, tv2) => {
          var yearA = new Date(tv1.date).getFullYear()
          var yearB = new Date(tv2.date).getFullYear()
          return (yearA < yearB) ? -1 : (yearA > yearB) ? 1 : 0
        })
      } else {
        shows = shows.sort((tv1, tv2) => {
          var yearA = new Date(tv1.date).getFullYear()
          var yearB = new Date(tv2.date).getFullYear()
          return (yearA > yearB) ? -1 : (yearA < yearB) ? 1 : 0
        })
      }
    }

    return shows
  }
}
