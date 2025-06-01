'use client'
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

type Review = {
  id: number;
  content: string;
  anime_id: number;
  user_id: number;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("❌ Error fetching reviews:", error);
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, []);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          anime_id: 1,  // or dynamic anime ID
          user_id: 999, // replace with real user ID if you have auth
          content: content,
        },
      ])
      .select()
      .single();
  
    if (error) {
      console.error("❌ Error inserting review:", error);
      return;
    }
  
    setReviews((prev) => [data, ...prev]);
    setContent("");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Reviews</h1>
      <form onSubmit={submitReview} style={{ marginBottom: 20 }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Submit
        </button>
      </form>

      <ul>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((r) => (
            <li key={r.id}>
              <strong>{`Review #${r.id}`}</strong>: {r.content}
            </li>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </ul>
    </main>
  );
}