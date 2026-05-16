import { getServerApiKey, searchMovies } from '@/lib/omdb'
import MovieCard from './MovieCard'
import MovieSearch from './MovieSearch'

async function getPopularMovies() {
  const apiKey = getServerApiKey()
  const [marvel, batman, star] = await Promise.all([
    searchMovies('marvel', apiKey),
    searchMovies('batman', apiKey),
    searchMovies('star', apiKey),
  ])

  const merged = [...marvel, ...batman, ...star]
  const unique = merged.filter(
    (movie, index, arr) => arr.findIndex((m) => m.imdbID === movie.imdbID) === index
  )
  return unique.slice(0, 12)
}

export default async function MoviesPage() {
  const popularMovies = await getPopularMovies()

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            🎬 Galería de Películas y Series
          </h1>
          <p className="mt-3 text-lg text-zinc-400">
            Actividad integradora — OMDb API · SSR + CSR
          </p>
        </header>

        {/* SSR: Películas populares */}
        <section className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Populares del momento</h2>
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
              SSR — Renderizado en servidor
            </span>
          </div>

          {popularMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} badge="Popular" />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-200">
              No se pudieron cargar películas populares. Verifica tu API key en .env.local
            </p>
          )}

          <p className="mt-4 text-sm text-zinc-500">
            Estos datos se obtienen en el servidor antes de enviar el HTML (mejor SEO y primera
            carga con contenido).
          </p>
        </section>

        {/* CSR: Búsqueda */}
        <MovieSearch />

        {/* Justificación */}
        <section className="mt-12 rounded-2xl border border-zinc-700 bg-zinc-900/50 p-6">
          <h3 className="text-xl font-bold text-white">📋 Justificación SSR vs CSR</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
              <h4 className="font-semibold text-green-400">SSR — Sección populares</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
                <li>Contenido visible en el HTML inicial</li>
                <li>Mejor para SEO y redes sociales</li>
                <li>No requiere JavaScript para ver la lista</li>
                <li>Ideal para contenido estático o poco interactivo</li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
              <h4 className="font-semibold text-blue-400">CSR — Búsqueda y modal</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-400">
                <li>Búsqueda en tiempo real sin recargar</li>
                <li>Selector de año y modal interactivos</li>
                <li>useState y useEffect para estado y peticiones</li>
                <li>Menor carga en el servidor al buscar</li>
              </ul>
            </div>
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
          <a href="/pokemon-csr" className="hover:text-amber-400">
            Pokémon CSR
          </a>
          <a href="/pokemon-ssr" className="hover:text-amber-400">
            Pokémon SSR
          </a>
          <a href="/weather" className="hover:text-amber-400">
            Clima
          </a>
        </nav>
      </div>
    </div>
  )
}
