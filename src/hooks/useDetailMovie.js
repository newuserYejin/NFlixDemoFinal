import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchDetailMovies = (id) => {
    return api.get(`/movie/${id}`)
}

const fetchMovieReviews = (id) => {
    return api.get(`/movie/${id}/reviews`)
}

export const useDetailMoviesQuery = (id) => {
    return useQuery({
        queryKey: ['detail-movie'],
        queryFn: () => fetchDetailMovies(id),
        select: (result) => result.data
    })
}

export const useMovieReviewsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-reviews'],
        queryFn: () => fetchMovieReviews(id),
        select: (result) => result.data
    })
}
