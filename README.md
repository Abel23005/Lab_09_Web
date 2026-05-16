# Lab09 — Desarrollo de Aplicaciones Web Avanzado

Proyecto Next.js (App Router) con ejercicios de **CSR**, **SSR** y renderizado híbrido. Incluye integración con PokeAPI, Open-Meteo y OMDb.

## Requisitos previos

- [Node.js](https://nodejs.org/) **> 18.18**
- npm (incluido con Node.js)

```bash
node -v
npm -v
```

## Instalación

```bash
# Clonar o descargar el repositorio
cd Lab09

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

Edita `.env.local` y agrega tu API key gratuita de OMDb:

1. Regístrate en [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Copia tu key en `.env.local`:

```env
OMDB_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_OMDB_API_KEY=tu_api_key_aqui
```

> **Importante:** `.env.local` está en `.gitignore` y **no debe subirse a Git**. Solo comparte `.env.example` como referencia.

## Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Otros comandos:

```bash
npm run build   # Compilar para producción
npm run start   # Servidor de producción
npm run lint    # ESLint
```

## Rutas del laboratorio

| Ruta | Ejercicio | Estrategia |
|------|-----------|------------|
| [/pokemon-csr](http://localhost:3000/pokemon-csr) | 1.1 — Pokémon CSR | Client-Side Rendering |
| [/pokemon-ssr](http://localhost:3000/pokemon-ssr) | 1.1 — Pokémon SSR | Server-Side Rendering |
| [/weather](http://localhost:3000/weather) | 2.1 — Dashboard del clima | Híbrido (SSR + CSR) |
| [/movies](http://localhost:3000/movies) | Actividad integradora — Galería OMDb | Híbrido (SSR + CSR) |

## Estructura del proyecto

```
Lab09/
├── app/
│   ├── pokemon-csr/      # CSR con useEffect + axios
│   ├── pokemon-ssr/      # SSR con async/await
│   ├── weather/          # Dashboard híbrido del clima
│   └── movies/           # Galería de películas y series
├── lib/
│   └── omdb.ts           # Utilidades OMDb (servidor)
├── .env.example          # Plantilla de variables (sin secretos)
├── .env.local            # Tus claves (ignorado por Git)
└── package.json
```

## APIs utilizadas

| API | Uso | Documentación |
|-----|-----|---------------|
| [PokeAPI](https://pokeapi.co/) | Pokémon CSR/SSR | Gratuita |
| [Open-Meteo](https://open-meteo.com/) | Clima | Gratuita |
| [OMDb](https://www.omdbapi.com/) | Películas y series | Key gratuita (1000 req/día) |

### Ejemplos OMDb

```
# Búsqueda general
https://www.omdbapi.com/?apikey=TU_KEY&s=marvel

# Por título y año
https://www.omdbapi.com/?apikey=TU_KEY&t=suits&y=2012

# Por ID IMDb
https://www.omdbapi.com/?apikey=TU_KEY&i=tt3784006
```

## Justificación SSR vs CSR

| Caso de uso | Estrategia | Motivo |
|-------------|------------|--------|
| Listados iniciales, SEO, primera carga | **SSR** | HTML con datos desde el servidor |
| Búsquedas, formularios, modales | **CSR** | Interactividad sin recargar la página |

## Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Seguridad

- No commitees archivos `.env`, `.env.local` ni claves API.
- Si una key se expone, revócala y genera una nueva en OMDb.
- El archivo `.env.example` solo contiene placeholders.

## Autor

Laboratorio — Tecsup · Desarrollo de Aplicaciones Web Avanzado
