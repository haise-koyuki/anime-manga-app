'use client'

import { useEffect, useState } from 'react'
import { fetchMedia } from '@/lib/anilist'
import Link from 'next/link'
import SearchFilters from '@/components/SearchFilters'

type MediaItem = {
  id: number
  title: { romaji: string }
  coverImage: { large: string }
  format: string | null
}

const initialFilters = {
  type: 'ANIME',
  genre: '',
  yearGroup: '2021-2025',
  sort: 'POPULARITY_DESC',
}

export default function ExplorePage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchMedia({ searchQuery, filters })
      .then((data) => {
        setMediaList(data)
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchQuery, filters])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Anime & Manga</h1>

      <SearchFilters
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && mediaList.length === 0 && (
        <p>No results found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {mediaList.map((item) => (
          <Link
            key={item.id}
            href={`/anime/${item.id}`}
            className="bg-white shadow rounded p-2 hover:scale-105 transition"
          >
            <img
              src={item.coverImage.large}
              alt={item.title.romaji}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 text-sm font-semibold truncate">
              {item.title.romaji}
            </h3>
            <p className="text-xs text-gray-500">{item.format}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}