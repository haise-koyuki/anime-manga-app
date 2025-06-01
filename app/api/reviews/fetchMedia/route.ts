import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { mediaIds, mediaType } = body;

  const query = `
    query ($ids: [Int], $type: MediaType) {
      Page(perPage: 50) {
        media(id_in: $ids, type: $type) {
          id
          title {
            romaji
          }
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { ids: mediaIds, type: mediaType },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data.data.Page.media);
}