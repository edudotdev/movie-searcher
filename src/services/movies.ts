

export const searchMovies = async (search: string) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=529de293&s=${search}`)
    const data = await response.json()

    const movies = data.Search

    return movies?.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }))
  }
  catch (error) {
    throw new Error('Error fetching movies')
  }
}
