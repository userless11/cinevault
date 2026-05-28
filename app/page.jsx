import { useMemo, useState } from "react";

export default function CineVault() {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [favorites, setFavorites] = useState(["Interstellar"]);
  const [user] = useState({ name: "Maarten" });

  const movies = [
    { title: "Dune: Part Two", genre: "Sci‑Fi", year: 2024, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", trailer: "https://www.youtube.com/watch?v=Way9Dexny3w" },
    { title: "Oppenheimer", genre: "Drama", year: 2023, rating: 8.5, poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg", trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg" },
    { title: "Interstellar", genre: "Adventure", year: 2014, rating: 8.7, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E" },
  ];

  const filtered = useMemo(() =>
    movies.filter(
      (m) =>
        (genreFilter === "All" || m.genre === genreFilter) &&
        m.title.toLowerCase().includes(search.toLowerCase())
    ),
  [movies, genreFilter, search]);

  const toggleFavorite = (title) => {
    setFavorites((f) =>
      f.includes(title) ? f.filter((x) => x !== title) : [...f, title]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <div className="text-3xl font-bold">CineVault</div>
          <div className="flex gap-4 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl bg-zinc-900 px-4 py-2"
              placeholder="Search…"
            />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="rounded-xl bg-zinc-900 px-4 py-2"
            >
              <option>All</option>
              <option>Sci‑Fi</option>
              <option>Drama</option>
              <option>Adventure</option>
            </select>
            <div className="rounded-xl bg-zinc-900 px-4 py-2">👤 {user.name}</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Continue Watching</h2>
          <div className="rounded-3xl bg-zinc-900 p-6">Resume: Interstellar — 1h 22m</div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">Movies</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((movie) => (
              <div key={movie.title} className="rounded-3xl bg-zinc-900 overflow-hidden border border-zinc-800">
                <a href={movie.trailer} target="_blank">
                  <img src={movie.poster} className="h-80 w-full object-cover" />
                </a>
                <div className="p-5 space-y-2">
                  <div className="text-lg font-semibold">{movie.title}</div>
                  <div className="text-sm text-zinc-400">{movie.year} • {movie.genre} • ⭐ {movie.rating}</div>
                  <button
                    onClick={() => toggleFavorite(movie.title)}
                    className="rounded-xl border border-zinc-700 px-4 py-2"
                  >
                    {favorites.includes(movie.title) ? "★ Favorite" : "☆ Add to favorites"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/*
Backend + deploy setup:
- Auth: Firebase Authentication or NextAuth
- Database: Firebase Firestore / Supabase
- Favorites + continue watching stored per account
- Deploy: connect GitHub repo to Vercel
- TMDb API key for live catalog + trailers
*/

