import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'
import { MOVIE } from '../types'

export const useMovies = (search: string, sort: boolean) => {
  const [movies, setMovies] = useState<MOVIE[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const previousSearch = useRef(search)

  const getMovies = useCallback(async (search: string) => {
    if (search === previousSearch.current) return
    
    try {
      setIsLoading(true)
      const newMovies = await searchMovies(search)
      previousSearch.current = search
      setMovies(newMovies)
    } catch(error: unknown) {
      if (error instanceof Error) setError(error.message)
    }finally {
      setIsLoading(false)
    }
  }, [])

  const sortMovies = useMemo(() => {
    if (!movies) return []
    
    if (sort) {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title))
    }
    return movies
  }, [movies, sort])

  return { movies: sortMovies, getMovies, isLoading, error }
}
