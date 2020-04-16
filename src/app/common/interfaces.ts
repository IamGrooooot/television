export interface Genre {
  id: string
  fullName: string
  color: string
}

export interface TVShow {
  id: number
  name: string
  genres: string[]
  season: number
  networks: string[]
  date: Date
}

export interface Filter {
  name: string
  genre: string
  year: string
}

export interface Pagination {
  size: number
  page: number
  limit: number
  sortBy: SortBy
  sort: Sort
}

export enum SortBy {
  Name,
  Season,
  Network,
  Premiere
}

export enum Sort {
  ASC,
  DESC
}
