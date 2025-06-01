'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import ReviewWrapper from '@/app/anime/[id]/ReviewWrapper'
import React from 'react'
import toast from 'react-hot-toast'

export default function MediaDetailPage({
  params,
}: {
  params: { type: 'anime' | 'manga'; id: string }
}) {
  const [media, setMedia] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query ($id: Int, $type: MediaType) {
            Media(id: $id, type: $type) {
              id
              type
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              description
              genres
              averageScore
            }
          }
        `

        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { id: Number(params.id), type: params.type?.toUpperCase() },
          }),
        })

        const json = await res.json()
        console.log('AniList response:', json)
        if (json.errors) {
          console.error('AniList API error:', json.errors)
          return
        }
        setMedia(json.data.Media)
      } catch (err) {
        console.error('Fetch failed:', err)
      }
    }
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchData()
    fetchUser()
  }, [params.id, params.type])

  const handleLibraryUpdate = async (status: 'interested' | 'watching' | 'completed') => {
    if (!user || !media) {
      alert('You must be logged in to update your library.')
      return
    }

    const { error, data } = await supabase.from('user_library').upsert({
      user_id: user.id,
      media_id: media.id,
      media_type: params.type,
      status,
    })
    
    if (error) {
      console.error('Supabase error:', error.message)
      toast.error(error.message || 'Failed to save to library')
    } else {
      console.log('✅ Successfully added:', data)
      toast.success(`Added to your library as "${status}"`, {
        duration: 3000,
        position: 'top-right',
      })
    }
  }

  if (media === null) {
    return <p className="p-4 text-red-500">Failed to load media. Check the URL or your connection.</p>
  }

  if (!media) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{media.title.romaji}</h1>

      <div className="flex gap-4 my-2">
        <button
          className="text-xl hover:scale-110 transition"
          title="Add to Archived / Interested"
          onClick={() => handleLibraryUpdate('interested')}
        >
          ⭐️
        </button>
        <button
          className="text-xl hover:scale-110 transition"
          title="Mark as On-going"
          onClick={() => handleLibraryUpdate('watching')}
        >
          ⏳
        </button>
        <button
          className="text-xl hover:scale-110 transition"
          title="Mark as Completed"
          onClick={() => handleLibraryUpdate('completed')}
        >
          ☑️
        </button>
      </div>

      <img src={media.coverImage.large} alt="cover" className="w-48 my-4" />
      <p dangerouslySetInnerHTML={{ __html: media.description }} />
      <p>
        <strong>Genres:</strong> {media.genres.join(', ')}
      </p>
      <p>
        <strong>Score:</strong> {media.averageScore}
      </p>

      <hr className="my-4" />
      <ReviewWrapper animeId={media.id} />
    </div>
  )
}