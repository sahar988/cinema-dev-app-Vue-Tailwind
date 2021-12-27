 import {MOVIE_LIST, GENRE_LIST } from '~/utility/endpoints'
 
 export const state=()=>({
    genreList:[]
 })

 export const mutations= {
     setGenreList(state, genreList){
         state.genreList = genreList || []
     }
 }

 export const actions ={
    getMovieList({commit}){
        try {
            return this.$axios.$get(MOVIE_LIST)
            // commit('setMovieList', response?.results)
        } catch(err){
            console.log(err)
        }
    },
    async getGenreList({commit}){
        try {
            const response = await this.$axios.$get(GENRE_LIST)
             commit('setGenreList', response?.genres)
        } catch(err){
            console.log(err)
        }
    },

 }