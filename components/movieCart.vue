<template>
  <nuxt-link :to="`/Movies/${movie.id}`">
  <div class="flex bg-gray-100 rounded-md dark:bg-gray-800 h-48 xs:min-w-full xs:mx-8">
    <img class="w-32  m-1 rounded-l-md h-auto" :src="getImageUrl(movie.poster_path)">
    <div class="break-all pt-4 pb-3 px-3 text-center md:text-left flex flex-col justify-between">
      <strong>
        {{movie.title}}
      </strong>
      <div class="font-medium text-xs">
        <div class="mb-4 flex item-baseline">
          <img class="inline-block mr-1" :src="require('~/assets/icons/calendar.svg')" />
          <span>{{movie.release_date}}</span>
        </div>
        <div class="text-left">
          <span class="mr-1" v-for="genre in movieGenres" :key="genre.id">&bull;<span class="ml-1">{{genre.name}}</span></span>
        </div>
      </div>
    </div>
  </div>
    </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'; 
import movieMixin from '~/mixins/movieMixin'

export default {
  props:{
    movie: {
      type: Object,
      default:()=>({})
    }
  },
  mixins:[movieMixin],
  data(){
    return {
      movieGenres:[]
    }
  },
  computed:{
    ...mapState(['genreList'])
  },
  mounted(){
    this.retrieveGenreFromMovie()
  },
  methods:{
    retrieveGenreFromMovie(){
      const genres = this.movie?.genre_ids
      this.movieGenres = this.genreList.filter(function(genre) {
        return (genres||[]).indexOf(genre.id) != -1;
      });
    }
  }
}
</script>