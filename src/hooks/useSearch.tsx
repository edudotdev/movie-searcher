import { useEffect, useRef, useState } from 'react'

export const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const idFirstLoad = useRef(true)

  useEffect(() => {
    if (idFirstLoad.current) {
      idFirstLoad.current = search === ''
      return
    }
    
    if (search === '') {
      setError('type something')
      return
    }

    if (search.length <= 2) {
      setError('Too few characters')
      return
    }

    setError(null)
  }, [search])
  return {search, setSearch, error}
}
