import { Genre, Pagination, SortBy, Sort, Filter } from './interfaces';

export var PaginationDefault: Pagination = {
  size: 0,
  page: 1,
  limit: 5,
  sortBy: SortBy.Name,
  sort: Sort.ASC
}

export var FilterDefault: Filter = {
  name: '',
  genre: 'all',
  year: 'all'
}

export const Genres: Genre[] = [
  {
    id: 'action',
    fullName: 'Action',
    color: '#a1cfb4'
  },
  {
    id: 'adventure',
    fullName: 'Adventure',
    color: '#cde370'
  },
  {
    id: 'animation',
    fullName: 'Animation',
    color: '#6902f8'
  },
  {
    id: 'biography',
    fullName: 'Biography',
    color: '#5dde2c'
  },
  {
    id: 'comedy',
    fullName: 'Comedy',
    color: '#7711a3'
  },
  {
    id: 'crime',
    fullName: 'Crime',
    color: '#bad80a'
  },
  {
    id: 'documentary',
    fullName: 'Documentary',
    color: '#ad76c6'
  },
  {
    id: 'drama',
    fullName: 'Drama',
    color: '#901a13'
  },
  {
    id: 'family',
    fullName: 'Family',
    color: '#008be0'
  },
  {
    id: 'fantasy',
    fullName: 'Fantasy',
    color: '#4db714'
  },
  {
    id: 'game_show',
    fullName: 'Game Show',
    color: '#2947c1'
  },
  {
    id: 'history',
    fullName: 'History',
    color: '#7ff8a9'
  },
  {
    id: 'horror',
    fullName: 'Horror',
    color: '#4a1019'
  },
  {
    id: 'music',
    fullName: 'Music',
    color: '#e643e6'
  },
  {
    id: 'musical',
    fullName: 'Musical',
    color: '#6ee516'
  },
  {
    id: 'mystery',
    fullName: 'Mystery',
    color: '#d6fd91'
  },
  {
    id: 'news',
    fullName: 'News',
    color: '#32c082'
  },
  {
    id: 'reality_tv',
    fullName: 'Reality-TV',
    color: '#bb65e5'
  },
  {
    id: 'romance',
    fullName: 'Romance',
    color: '#5657ce'
  },
  {
    id: 'sci_fi',
    fullName: 'Sci-Fi',
    color: '#d6a905'
  },
  {
    id: 'sport',
    fullName: 'Sport',
    color: '#e15b98'
  },
  {
    id: 'superhero',
    fullName: 'Superhero',
    color: '#5bab93'
  },
  {
    id: 'talk_show',
    fullName: 'Talk Show',
    color: '#bdfb4b'
  },
  {
    id: 'thriller',
    fullName: 'Thriller',
    color: '#6aafe9'
  },
  {
    id: 'war',
    fullName: 'War',
    color: '#26e6d5'
  },
  {
    id: 'western',
    fullName: 'Western',
    color: '#aa3bd9'
  }
]

export const Years: string[] = [
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
]
