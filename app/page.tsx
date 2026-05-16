import Link from 'next/link'

const routes = [
  {
    href: '/pokemon-csr',
    title: 'Pokémon CSR',
    description: 'Client-Side Rendering — datos en el navegador',
    emoji: '🎮',
    color: 'from-blue-600 to-purple-600',
  },
  {
    href: '/pokemon-ssr',
    title: 'Pokémon SSR',
    description: 'Server-Side Rendering — datos en el servidor',
    emoji: '⚡',
    color: 'from-green-500 to-teal-600',
  },
  {
    href: '/weather',
    title: 'Dashboard del Clima',
    description: 'Híbrido SSR + CSR — Lima y ciudades del mundo',
    emoji: '☁️',
    color: 'from-sky-400 to-indigo-600',
  },
  {
    href: '/movies',
    title: 'Galería de Películas',
    description: 'Actividad integradora — OMDb API',
    emoji: '🎬',
    color: 'from-amber-600 to-zinc-900',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Lab09 — Web Avanzado
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            CSR, SSR y renderizado híbrido con Next.js
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`group rounded-2xl border border-zinc-700/80 bg-gradient-to-br ${route.color} p-6 shadow-xl transition hover:scale-[1.02] hover:border-amber-500/50`}
            >
              <span className="text-4xl">{route.emoji}</span>
              <h2 className="mt-3 text-xl font-bold text-white group-hover:text-amber-300">
                {route.title}
              </h2>
              <p className="mt-2 text-sm text-white/80">{route.description}</p>
              <p className="mt-4 text-xs font-mono text-amber-200/90">{route.href}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          No necesitas configurar rutas en Vercel: cada carpeta en{' '}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">app/</code> es una
          URL automática.
        </p>
      </main>
    </div>
  )
}
