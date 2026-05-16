'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { OmdbSearchItem, OmdbDetail } from '@/lib/omdb'
import MovieCard from './MovieCard'
import MovieModal from './MovieModal'

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY

export default function MovieSearch() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [results, setResults] = useState<OmdbSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<OmdbDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const fetchResults = useCallback(async (searchTitle: string, searchYear: string) => {
    if (!API_KEY) {
      setError('NEXT_PUBLIC_OMDB_API_KEY no configurada')
      return
    }
    if (!searchTitle.trim()) {
      setResults([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      let items: OmdbSearchItem[] = []

      if (searchYear.trim()) {
        const response = await axios.get<OmdbDetail & { Response: string }>(
          'https://www.omdbapi.com/',
          {
            params: { apikey: API_KEY, t: searchTitle.trim(), y: searchYear.trim() },
          }
        )
        if (response.data.Response === 'True') {
          items = [
            {
              Title: response.data.Title,
              Year: response.data.Year,
              imdbID: response.data.imdbID,
              Type: response.data.Type,
              Poster: response.data.Poster,
            },
          ]
        }
      } else {
        const response = await axios.get<{ Search?: OmdbSearchItem[]; Response: string; Error?: string }>(
          'https://www.omdbapi.com/',
          { params: { apikey: API_KEY, s: searchTitle.trim() } }
        )
        if (response.data.Response === 'True' && response.data.Search) {
          items = response.data.Search
        } else if (response.data.Error) {
          setError(response.data.Error)
        }
      }

      setResults(items)
      if (items.length === 0) {
        setError('No se encontraron resultados')
      } else {
        setError(null)
      }
    } catch {
      setError('Error al buscar. Intenta de nuevo.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(title, year)
    }, 500)
    return () => clearTimeout(timer)
  }, [title, year, fetchResults])

  const openDetail = async (imdbID: string) => {
    if (!API_KEY) return
    setDetailLoading(true)
    try {
      const response = await axios.get<OmdbDetail>(
        'https://www.omdbapi.com/',
        { params: { apikey: API_KEY, i: imdbID } }
      )
      if (response.data.Response === 'True') {
        setDetail(response.data)
      }
    } catch {
      setError('No se pudo cargar el detalle')
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-700/80 bg-zinc-900/60 p-6 backdrop-blur">
      <div className="mb-6 flex items-center gap-2">
        <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
        <h2 className="text-2xl font-bold text-white">Búsqueda interactiva</h2>
        <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-xs font-bold text-blue-300">
          CSR
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="search-title" className="mb-1 block text-sm font-medium text-zinc-400">
            Título
          </label>
          <input
            id="search-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: marvel, suits, batman..."
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
        <div>
          <label htmlFor="search-year" className="mb-1 block text-sm font-medium text-zinc-400">
            Año (opcional — búsqueda exacta)
          </label>
          <input
            id="search-year"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ej: 2012"
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Los resultados se actualizan en tiempo real sin recargar la página (debounce 500 ms).
      </p>

      {loading && (
        <div className="mt-8 flex justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-amber-500" />
        </div>
      )}

      {error && !loading && title.trim() && (
        <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
          {error}
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => openDetail(movie.imdbID)}
            />
          ))}
        </div>
      )}

      {detailLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-amber-500" />
        </div>
      )}

      {detail && !detailLoading && (
        <MovieModal movie={detail} onClose={() => setDetail(null)} />
      )}
    </section>
  )
}
