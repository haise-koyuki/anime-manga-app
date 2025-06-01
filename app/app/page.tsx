'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { fetchMediaById } from '@/lib/anilist'

type Review = {
  id: string
  user_id: string
  media_id: number
  media_type: 'anime' | 'manga'
  content: string
  created_at: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchReviews = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user

      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reviews:', error)
        return
      }

      const withMedia = await Promise.all(
        (data || []).map(async (review: Review) => {
          const media = await fetchAniListMedia(review.media_id)
          return { ...review, media }
        })
      )

      setReviews(withMedia)
      setLoading(false)
    }

    fetchReviews()
  }, [router])

  if (loading) return <p className="p-6">Loading your reviews...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't written any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded p-4 shadow-sm bg-white">
              <div className="flex gap-4">
                <img
                  src={review.media.coverImage.medium}
                  alt="cover"
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg">
                    {review.media.title.english || review.media.title.romaji}
                  </h2>
                  <p className="text-sm text-gray-500 italic">{review.created_at.slice(0, 10)}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function fetchAniListMedia(media_id: number) {
  throw new Error('Function not implemented.')
}
