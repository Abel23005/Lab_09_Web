import { OmdbSearchItem, validPoster } from '@/lib/omdb'

interface MovieCardProps {
  movie: OmdbSearchItem
  onClick?: () => void
  badge?: string
}

export default function MovieCard({ movie, onClick, badge }: MovieCardProps) {
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`group w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/90 text-left shadow-lg transition hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-amber-500/10 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="relative aspect-[2/3] bg-zinc-800">
        {validPoster(movie.Poster) ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-zinc-500">
            Sin póster
          </div>
        )}
        {badge && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-zinc-900">
            {badge}
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-black/75 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-300">
          {movie.Type}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold text-white group-hover:text-amber-400">
          {movie.Title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{movie.Year}</p>
      </div>
    </Wrapper>
  )
}
