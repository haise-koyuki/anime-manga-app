'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function ReviewsSection({
  media_id,
  media_type,
}: {
  media_id: number
  media_type: 'anime' | 'manga'
}) {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('media_id', media_id)
        .eq('media_type', media_type)
        .order('created_at', { ascending: false })

      if (error) console.error('Error loading reviews:', error)
      else setReviews(data || [])
    }

    fetchReviews()
  }, [media_id, media_type])

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet for this title.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border p-4 rounded shadow-sm bg-white">
              <p className="text-sm text-gray-800 whitespace-pre-line">{r.content}</p>
              <p className="text-xs text-right text-gray-500 mt-1">Submitted by a user</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-gray-400">Media data powered by AniList.</p>
    </section>
  )
}