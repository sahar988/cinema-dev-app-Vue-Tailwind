
 import { MOVIE_CREDIT, MOVIE_DETAIL} from '~/utility/endpoints'
 
 export const actions={
    getMovieCredit({commit}, movieId){
        try {
            return this.$axios.$get(MOVIE_CREDIT(movieId)) 
        } catch(err){
            console.log(err)
        }
    },
    getMovieDetail({commit}, movieId){
        try {
            return this.$axios.$get(MOVIE_DETAIL(movieId)) 
        } catch(err){
            console.log(err)
        }
    }
}