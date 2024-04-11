import api from '../utils/api'
import { useQuery } from '@tanstack/react-query'

const fetchRecommendMovies = (id) => {
    return api.get(`/movie/${id}/recommendations`)
}

export const useRecommendMoviesQuery = (id) => {
    return useQuery({
        queryKey: ['recommend-movies', id],
        queryFn: () => fetchRecommendMovies(id),
        select: (result) => result.data
    })
}