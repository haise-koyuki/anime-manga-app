import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
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
  `;

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id: Number(id) },
      }),
    });

    const json = await response.json();
    res.status(200).json(json.data.Media);
  } catch (error) {
    console.error('AniList fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch anime info' });
  }
}