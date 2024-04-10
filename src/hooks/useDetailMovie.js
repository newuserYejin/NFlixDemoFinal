import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchDetailMovies = (id) => {
    return api.get(`/movie/${id}`)
}

export const useDetailMoviesQuery = (id) => {
    return useQuery({
        queryKey: ['detail-movie'],
        queryFn: () => fetchDetailMovies(id),
        select: (result) => result.data
    })
}