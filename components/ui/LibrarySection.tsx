"use client";

import { useEffect, useState } from "react";


export function LibrarySection({ title, entries, mediaType }: {
  title: string;
  entries: any[];
  mediaType: "ANIME" | "MANGA";
}) {
  const [mediaData, setMediaData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetch("/api/fetchMedia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaType,
          mediaIds: entries.map((e: any) => e.media_id),
        }),
      });
      const data = await response.json();
      setMediaData(data);
    }

    fetchDetails();
  }, [entries, mediaType]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {mediaData.length === 0 && <p>Loading...</p>}
      {mediaData.map((media) => (
        <div key={media.id} className="mb-2">
          {media.title.romaji}
        </div>
      ))}
    </div>
  );
}