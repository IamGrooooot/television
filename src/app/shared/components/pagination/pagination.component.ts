import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';

import { Pagination } from 'src/app/common/interfaces';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls:['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: Pagination
  @Output() pageChange: EventEmitter<Pagination> = new EventEmitter<Pagination>()
  range: number = 2
  limit: number = 5

  pages: Observable<number[]>
  currentPage: number
  totalPages: number

  constructor() { }

  ngOnInit() {
    this.getPages((this.pagination.page - 1) * this.pagination.limit, this.pagination.limit, this.pagination.size)
  }

  ngOnChanges() {
    this.getPages((this.pagination.page - 1) * this.pagination.limit, this.pagination.limit, this.pagination.size)
  }

  getPages(offset: number, limit: number, size: number) {
    this.limit = limit
    this.currentPage = this.getCurrentPage(offset, limit)
    this.totalPages = this.getTotalPages(limit, size)
    this.pages = range(-this.range, this.range * 2 + 1)
      .pipe(
        map(offset => this.currentPage + offset),
        filter(page => this.isValidPageNumber(page, this.totalPages)),
        toArray()
      )
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1))
  }

  selectPage(page: number, event) {
    this.cancelEvent(event)

    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit({
        ...this.pagination,
        page: page
      })
    }
  }

  selectLimit(limit: number, event) {
    this.cancelEvent(event)

    if (this.isValidPageNumber(this.pagination.page, this.totalPages)) {
      this.pageChange.emit({
        ...this.pagination,
        limit: limit,
        page: 1
      })
    }
  }

  cancelEvent(event) {
    event.preventDefault()
  }
}
