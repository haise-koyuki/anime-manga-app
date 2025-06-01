export async function fetchMediaById(id: number) {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          medium
        }
        format
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables: { id } }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data.Media;
}
// import { useEffect } from 'react'

export async function fetchAniListExplore(type: string, sort: string) {
  const query = `
    query ($type: MediaType, $sort: [MediaSort]) {
      Page(perPage: 20) {
        media(type: $type, sort: $sort) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            medium
          }
          format
        }
      }
    }
  `;

  const variables = { type, sort: [sort] };

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data.Page.media;
}


interface MediaFilters {
  type?: string
  genre?: string
  yearGroup?: string
  sort?: string
}

export async function fetchMedia({
  searchQuery,
  filters,
  page = 1,
  perPage = 20,
}: {
  searchQuery: string
  filters: MediaFilters
  page?: number
  perPage?: number
}) {
  // Convert yearGroup to startDate bounds for AniList filtering
  const yearBounds = (yearGroup?: string): { startDate_greater?: number; startDate_lesser?: number } => {
    switch (yearGroup) {
      case '2021-2025':
        return { startDate_greater: 20210101, startDate_lesser: 20251231 }
      case '2016-2020':
        return { startDate_greater: 20160101, startDate_lesser: 20201231 }
      case '2011-2015':
        return { startDate_greater: 20110101, startDate_lesser: 20151231 }
      case '2006-2010':
        return { startDate_greater: 20060101, startDate_lesser: 20101231 }
      case '2001-2005':
        return { startDate_greater: 20010101, startDate_lesser: 20051231 }
      case '1996-2000':
        return { startDate_greater: 19960101, startDate_lesser: 20001231 }
      case '1991-1995':
        return { startDate_greater: 19910101, startDate_lesser: 19951231 }
      case '1986-1990':
        return { startDate_greater: 19860101, startDate_lesser: 19901231 }
      case 'before-1985':
        return { startDate_lesser: 19851231 }
      default:
        return {}
    }
  }

  const { startDate_greater, startDate_lesser } = yearBounds(filters.yearGroup)

  const query = `
    query (
      $page: Int,
      $perPage: Int,
      $search: String,
      $type: MediaType,
      $genre: String,
      $sort: [MediaSort],
      $startDate_greater: Int,
      $startDate_lesser: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        media(
          search: $search,
          type: $type,
          genre: $genre,
          sort: $sort,
          startDate_greater: $startDate_greater,
          startDate_lesser: $startDate_lesser
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          description
          format
          status
          episodes
          duration
          genres
          averageScore
        }
      }
    }
  `

  const variables = {
    page,
    perPage,
    search: searchQuery || null,
    type: filters.type || null,
    genre: filters.genre || null,
    sort: filters.sort ? [filters.sort] : ['POPULARITY_DESC'],
    startDate_greater: startDate_greater || null,
    startDate_lesser: startDate_lesser || null,
  }

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()
  console.log('AniList API response:', json)

  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '))
  }

  return json.data.Page.media
}
