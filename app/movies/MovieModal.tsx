'use client'

import { OmdbDetail, validPoster } from '@/lib/omdb'

interface MovieModalProps {
  movie: OmdbDetail
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-xl text-white transition hover:bg-amber-500 hover:text-black"
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
          <div className="mx-auto w-full max-w-[220px]">
            {validPoster(movie.Poster) ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-xl border border-zinc-700 shadow-lg"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-zinc-800 text-zinc-500">
                Sin póster
              </div>
            )}
          </div>

          <div>
            <h2 id="movie-modal-title" className="text-3xl font-bold text-white">
              {movie.Title}
            </h2>
            <p className="mt-1 text-amber-400">
              {movie.Year} · {movie.Type}
              {movie.totalSeasons && ` · ${movie.totalSeasons} temporadas`}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.imdbRating !== 'N/A' && (
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-300">
                  IMDb {movie.imdbRating}
                </span>
              )}
              {movie.Metascore !== 'N/A' && (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-300">
                  Metascore {movie.Metascore}
                </span>
              )}
              {movie.Rated !== 'N/A' && (
                <span className="rounded-full bg-zinc-700 px-3 py-1 text-sm text-zinc-300">
                  {movie.Rated}
                </span>
              )}
            </div>

            <p className="mt-4 leading-relaxed text-zinc-300">{movie.Plot}</p>

            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-amber-400">Género</dt>
                <dd className="text-zinc-300">{movie.Genre}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Duración</dt>
                <dd className="text-zinc-300">{movie.Runtime}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Director</dt>
                <dd className="text-zinc-300">{movie.Director}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Actores</dt>
                <dd className="text-zinc-300">{movie.Actors}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Escritor</dt>
                <dd className="text-zinc-300">{movie.Writer}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Estreno</dt>
                <dd className="text-zinc-300">{movie.Released}</dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">País / Idioma</dt>
                <dd className="text-zinc-300">
                  {movie.Country} · {movie.Language}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-amber-400">Premios</dt>
                <dd className="text-zinc-300">{movie.Awards}</dd>
              </div>
            </dl>

            {movie.Ratings?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-amber-400">Valoraciones</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {movie.Ratings.map((r) => (
                    <li
                      key={r.Source}
                      className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                    >
                      {r.Source}: {r.Value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
