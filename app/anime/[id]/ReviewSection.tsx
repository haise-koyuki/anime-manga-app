'use client';

import { useParams } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import { supabase } from '@/lib/supabaseClient'
import { useUser } from "@/lib/useUser";


type Review = {
  [x: string]: ReactNode;
  id: string;
  user_id: number;
  content: string;
  created_at: string;
  media_id: number;
  media_type: 'anime' | 'manga';
}

export default function ReviewsSection({ mediaId, mediaType }: { mediaId: number, mediaType: 'anime' | 'manga' }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [content, setContent] = useState("");
  const user = useUser();

  const [votes, setVotes] = useState<Record<string, number>>({})
  const [userVotes, setUserVotes] = useState<Record<string, number>>({})

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    console.log("Fetching reviews for media ID:", mediaId);
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('media_id', mediaId)
        .eq('media_type', mediaType)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching reviews:', error);
        setReviews([]);
      } else {
        setReviews(data as Review[]);
      }
    };
    fetchReviews();
  }, [mediaId, mediaType]);

  useEffect(() => {
    const fetchVotes = async () => {
      const voteQuery = await supabase
        .from('review_votes')
        .select('review_id, vote')

      const userVoteQuery = await supabase
        .from('review_votes')
        .select('review_id, vote')
        .eq('user_id', user?.id)

      const allVotes = voteQuery.data || []
      const voteCount: Record<string, number> = {}
      allVotes.forEach(v => {
        voteCount[v.review_id] = (voteCount[v.review_id] || 0) + v.vote
      })
      setVotes(voteCount)

      const myVotes: Record<string, number> = {}
      ;(userVoteQuery.data || []).forEach(v => {
        myVotes[v.review_id] = v.vote
      })
      setUserVotes(myVotes)
    }

    if (user?.id) fetchVotes()
  }, [reviews, user?.id])

  const handleVote = async (reviewId: string, value: number) => {
    if (!user) return

    const existing = userVotes[reviewId]
    let newValue = value

    if (existing === value) {
      newValue = 0
    }

    const { error } = await supabase
      .from('review_votes')
      .upsert({
        user_id: user.id,
        review_id: reviewId,
        vote: newValue || null,
      } as any)

    if (error) {
      console.error('Vote error:', error)
      return
    }

    const updatedVotes = { ...votes }
    updatedVotes[reviewId] = (updatedVotes[reviewId] || 0) + (newValue - (existing || 0))
    setVotes(updatedVotes)

    const updatedUserVotes = { ...userVotes }
    if (newValue === 0) delete updatedUserVotes[reviewId]
    else updatedUserVotes[reviewId] = newValue
    setUserVotes(updatedUserVotes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) {
      alert("You need to log in to submit a review.");
      return;
    }

    // Use user.id directly from supabase user object
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          media_id: mediaId,
          media_type: mediaType,
          user_id: user.id,
          content,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error submitting review:', error);
      alert('Failed to submit review');
    } else {
      setReviews((prev) => [data, ...prev]);
      setContent('');
    }
  };

  // ✅ RETURN MUST BE HERE, OUTSIDE handleSubmit
  return (
    <>
      {reviews.length === 0 && (
        <p className="text-gray-500 italic">
          No reviews from users yet — be the first to write one!
        </p>
      )}

      {reviews.map((review) => (
        <div key={review.id}>
          <strong>User {review.user_id}:</strong>
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {expanded[review.id]
              ? review.content
              : review.content.length > 300
              ? review.content.slice(0, 300) + '...'
              : review.content}
          </p>
          {review.content.length > 300 && (
            <button
              onClick={() => toggleExpanded(review.id)}
              className="text-xs text-blue-600 underline mt-1"
            >
              {expanded[review.id] ? 'Show less' : 'Read more'}
            </button>
          )}
          <div className="flex items-center gap-2 text-sm mt-1">
            <button
              className={`hover:text-green-600 ${
                userVotes[review.id] === 1 ? 'text-green-600 font-bold' : 'text-gray-400'
              }`}
              onClick={() => handleVote(review.id, 1)}
              type="button"
            >
              ▲
            </button>
            <span>{votes[review.id] ?? 0}</span>
            <button
              className={`hover:text-red-600 ${
                userVotes[review.id] === -1 ? 'text-red-600 font-bold' : 'text-gray-400'
              }`}
              onClick={() => handleVote(review.id, -1)}
              type="button"
            >
              ▼
            </button>
          </div>
        </div>
      ))}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label htmlFor="review" className="block font-medium text-gray-700">
            Write your review:
          </label>
          <textarea
            id="review"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your thoughts about this title..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="mt-4 text-gray-700">
          Want to share your thoughts?{' '}
          <a href="/login" className="text-blue-600 underline hover:text-blue-800">
            Log in to write a review.
          </a>
        </p>
      )}
    </>
  );
}