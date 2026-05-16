export interface OmdbSearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface OmdbDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: { Source: string; Value: string }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  totalSeasons?: string
  Response: string
  Error?: string
}

export function getServerApiKey(): string {
  const key = process.env.OMDB_API_KEY
  if (!key) throw new Error('OMDB_API_KEY no configurada en .env.local')
  return key
}

export async function searchMovies(query: string, apiKey: string): Promise<OmdbSearchItem[]> {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  if (data.Response !== 'True' || !data.Search) return []
  return data.Search
}

export async function getMovieById(imdbId: string, apiKey: string): Promise<OmdbDetail | null> {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`, {
    next: { revalidate: 3600 },
  })
  const data: OmdbDetail = await res.json()
  if (data.Response !== 'True') return null
  return data
}

export function validPoster(poster: string): boolean {
  return Boolean(poster && poster !== 'N/A')
}
