'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { fetchMediaById } from '@/lib/anilist'

type UserLibraryItem = {
  [x: string]: any
  id: string
  media_id: number
  media_type: 'anime' | 'manga'
  status: 'watching' | 'interested' | 'completed' | 'dropped'
  created_at: string
}

const statuses = ['watching', 'interested', 'completed', 'dropped'] as const

export default function LibraryPage() {
  const [items, setItems] = useState<UserLibraryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLibrary = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
  
      if (userError) {
        console.error('Error fetching user:', userError.message)
        setLoading(false)
        return
      }

      if (!user?.id) {
        console.warn('User is not logged in')
        setLoading(false)
        return
      }
  
      console.log('USER ID:', user.id)
  
      const { data, error } = await supabase
        .from('user_library')
        .select('*')
        .eq('user_id', user.id)
  
      if (error) {
        console.error('Fetch error:', error.message)
      } else {
        console.log('Fetched library items:', data)
        setItems(data || [])
        const detailed = await Promise.all(
          data.map(async item => {
            const media = await fetchMediaById(item.media_id)
            return { ...item, media }
          })
        )
        
        setItems(detailed)
      }
  
      setLoading(false)
    }
  
    fetchLibrary()
  }, [])

  if (loading) return <p>Loading your library...</p>

  if (items.length === 0) return <p>Your library is empty. Add some titles!</p>

  // Group by media_type and then by status
  const grouped: {
    anime: Record<typeof statuses[number], UserLibraryItem[]>
    manga: Record<typeof statuses[number], UserLibraryItem[]>
  } = {
    anime: {} as Record<typeof statuses[number], UserLibraryItem[]>,
    manga: {} as Record<typeof statuses[number], UserLibraryItem[]>,
  }

  statuses.forEach(status => {
    grouped.anime[status] = items.filter(
      item => item.media_type === 'anime' && item.status === status
    )
    grouped.manga[status] = items.filter(
      item => item.media_type === 'manga' && item.status === status
    )
  })

  return (
    <div className="p-6 space-y-8">
      {['anime', 'manga'].map(mediaType => (
        <section key={mediaType}>
          <h2 className="text-2xl font-bold capitalize mb-4">{mediaType}</h2>
          {statuses.map(status => (
            <div key={status} className="mb-6">
              <h3 className="text-xl font-semibold capitalize mb-2">{status}</h3>
              {grouped?.[mediaType as keyof typeof grouped]?.[status]?.length === 0 ? (
                <p>No titles in this category.</p>
              ) : (
                <ul className="list-disc list-inside">
                                    {grouped?.[mediaType as keyof typeof grouped]?.[status]?.map((item: UserLibraryItem) => (
                    item?.media_id && item?.media_type ? (
                      <li
                        key={item.id}
                        className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => {
                          window.location.href = `/${item.media_type}/${item.media_id}`
                        }}
                      >
                        {item.media?.coverImage?.medium ? (
                          <img src={item.media.coverImage.medium} alt="cover" className="w-12 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                          </div>
                        )}
                        </li>
                      ) : null
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}