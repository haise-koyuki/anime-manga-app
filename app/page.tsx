'use client'

import { useEffect, useState } from 'react'
import { fetchAniListExplore } from '@/lib/anilist'
import Link from 'next/link'

type MediaItem = {
  id: number
  coverImage: { medium: string }
  title: { english?: string; romaji: string }
  format: string | null
}

const sections = [
  { title: '🔥 Trending Anime', type: 'ANIME', sort: 'TRENDING_DESC' },
  { title: '🌟 Top-Rated Anime', type: 'ANIME', sort: 'SCORE_DESC' },
  { title: '📚 Popular Manga', type: 'MANGA', sort: 'POPULARITY_DESC' },
  { title: '🧠 Top-Rated Manga', type: 'MANGA', sort: 'SCORE_DESC' }
]

export default function HomePage() {
  const [data, setData] = useState<Record<string, MediaItem[]>>({})

  useEffect(() => {
    const fetchAll = async () => {
      const newData: Record<string, MediaItem[]> = {}
      for (const section of sections) {
        const list = await fetchAniListExplore(section.type, section.sort)
        newData[section.title] = list
      }
      setData(newData)
    }
    fetchAll()
  }, [])

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Welcome to your Library</h1>
      <p className="text-gray-600 mb-6">This is your private anime-manga dashboard 🎌</p>

      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <Link
              href={`/explore?type=${section.type}&sort=${section.sort}`}
              className="text-sm text-blue-500 hover:underline"
            >
              Explore more →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {(data[section.title] || []).map((item) => (
                <Link
                  href={`/${section.type.toLowerCase()}/${item.id}`}
                  key={item.id}
                  className="min-w-[150px] bg-white shadow rounded p-2 hover:scale-105 transition"
                >
                  <img
                    src={item.coverImage.medium}
                    alt="cover"
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-2 text-sm font-semibold truncate">
                    {item.title.english || item.title.romaji}
                  </h3>
                  <p className="text-xs text-gray-500">{item.format}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}