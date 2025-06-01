import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';

// Supabase client (init once)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role key for backend
);
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  console.log("Fetching AniList data for:", id);

  try {
    const response = await fetchAniListData(id);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    console.error("AniList fetch error:", e);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token =
      (req.headers['token'] as string) ||
      (typeof req.headers['authorization'] === 'string'
        ? req.headers['authorization'].split(' ')[1]
        : undefined);
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Unauthorized' });

    const { animeId, content } = req.body;

    if (!content || !animeId) {
      return res.status(400).json({ error: 'Missing content or animeId' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([{ anime_id: animeId, user_id: user.id, content }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data);
  } else if (req.method === 'GET') {
    // Handle fetching reviews logic here
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function fetchAniListData(id: string | null) {
  throw new Error('Function not implemented.');
}
