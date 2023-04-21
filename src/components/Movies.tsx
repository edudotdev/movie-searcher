import { MOVIE } from '../types'
import { ListOfMovies } from './ListOfMovies'
import { NoMovies } from './NoMovies'

interface Props {
  movies: MOVIE[]
}

export const Movies = ({
  movies
}:Props) => {
  const hasMovies = movies?.length > 0

  return (
    <section className='mt-10 w-full grid-responsive'>
      {hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMovies />}
    </section>
  )
}
