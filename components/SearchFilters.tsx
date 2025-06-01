'use client'

import React from 'react'

interface SearchFiltersProps {
  filters: {
    type: string
    genre: string
    yearGroup: string
    sort: string
  }
  setFilters: (filters: any) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search anime or manga..."
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <select name="type" value={filters.type} onChange={handleChange} className="p-2 border rounded">
          <option value="ANIME">Anime</option>
          <option value="MANGA">Manga</option>
        </select>

        <select name="genre" value={filters.genre} onChange={handleChange} className="p-2 border rounded">
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Romance">Romance</option>
          <option value="Slice of Life">Slice of Life</option>
          {/* Add more genres as needed */}
        </select>

        <select name="yearGroup" value={filters.yearGroup} onChange={handleChange} className="p-2 border rounded">
          <option value="2021-2025">2021–2025</option>
          <option value="2016-2020">2016–2020</option>
          <option value="2011-2015">2011–2015</option>
          <option value="2006-2010">2006–2010</option>
          <option value="2001-2005">2001–2005</option>
          <option value="1996-2000">1996–2000</option>
          <option value="1991-1995">1991–1995</option>
          <option value="1986-1990">1986–1990</option>
          <option value="before-1985">Before 1985</option>
        </select>

        <select name="sort" value={filters.sort} onChange={handleChange} className="p-2 border rounded">
          <option value="POPULARITY_DESC">Most Popular</option>
          <option value="SCORE_DESC">Top Rated</option>
          <option value="START_DATE_DESC">Newest</option>
          <option value="TITLE_ROMAJI">A-Z</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilters