'use client'

import React from 'react'

interface MediaCardProps {
  media: {
    id: number
    title: {
      romaji: string
    }
    coverImage: {
      large: string
    }
  }
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  return (
    <div className="bg-gray-900 rounded overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={media.coverImage.large}
        alt={media.title.romaji}
        className="w-full h-auto"
      />
      <div className="p-2 text-sm text-white">
        {media.title.romaji}
      </div>
    </div>
  )
}

export { MediaCard }