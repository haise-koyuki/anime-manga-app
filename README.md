# ✨ anime-manga-app

A full-stack web app built with Next.js, Supabase, and the AniList GraphQL API — designed to help users explore, review, and manage their favorite anime and manga in a clean, aesthetic experience.

> 🚧 This project is under active development.

---

## 🔎 Features (Current Progress)

- 🌐 Home Page: Displays trending or popular anime from AniList.
- 🔐 Authentication:
  - Magic link login via Supabase (email)
  - Discord OAuth login
- 🧑‍💼 User Dashboard (WIP):
  - Personalized library for anime & manga
  - Reviews by user and per anime/manga (linked to AniList ID)
- 🧾 Review System:
  - Basic structure implemented
  - Users can add and view reviews for titles
- 🎨 Design Goal:
  - Pastel tones and anime-inspired UI (Spicetify-inspired aesthetic)
  - Baby blue, pastel pink, and neon lilac palette

---

## 🛠️ Stack

| Tech            | Purpose                             |
|-----------------|-------------------------------------|
| Next.js 14      | React framework (frontend + SSR)    |
| Supabase        | Auth, DB (PostgreSQL)               |
| AniList API     | Anime & manga data (GraphQL)        |
| Tailwind CSS    | Styling (planned)                   |
| TypeScript      | Strong typing for safer dev         |

---

## 🚀 Planned Features

- Full user library (track watching/reading status)
- Like & comment system on reviews
- Search and filter functionality for titles
- Collection tagging & rating
- Responsive mobile-first design
- BFF / Date / Pro Mode (experimental social extension)

---

## 📦 Local Development

Clone the repo:

```bash
git clone https://github.com/your-username/anime-manga-app.git
cd anime-manga-app
