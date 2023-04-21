import { MOVIE } from '../types'

interface Props {
  movies: MOVIE[]
}

export const ListOfMovies = ({
  movies
}:Props) => {
  return (
    <>
      {movies?.map((movie: MOVIE) => (
        <div key={movie.id} className='flex flex-col items-center gap-4'>
          <header className='flex flex-col items-center gap-5'>
            <h2 className='m-0 text-sm'>{movie.title}</h2>
            <p className='m-0'>{movie.year}</p>
          </header>
          <img src={movie.poster} alt={movie.title} />
        </div>
      ))}
    </>
  )
}
