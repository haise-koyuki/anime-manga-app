'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ReviewsSection = dynamic(() => import('./ReviewSection')) as unknown as React.FC<{ animeId: number }>;

export default function ReviewWrapper({ animeId }: { animeId: number }) {
  return <ReviewsSection animeId={animeId} />;
}