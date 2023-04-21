import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, isLoading, error: moviesError } = useMovies(search, sort)

  const debouncedGetMovies = useCallback( 
    debounce((search: string) => {
      getMovies(search)
    }, 400)
  , [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getMovies(search)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <header className="flex flex-col items-center">
        <h1>Movie searcher</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input autoComplete='off' onChange={handleChange} value={search} name='query' type="text" placeholder="Search movie..." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit" className="bg-sky-500">Search</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </header>

      <main className="flex justify-center w-full max-w-[1000px]">
        {isLoading && movies?.length !== 0
          ? <p className="text-white mt-10">Loading...</p>
          : <Movies movies={movies} /> 
        }
      </main>
    </>
  )
}
export default App