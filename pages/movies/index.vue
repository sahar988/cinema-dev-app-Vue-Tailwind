<template>
<div>
    <Search />
    <div v-if="movieList.length" class="container mx-auto mt-30 grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4 mb-40">
        <div v-for="item in movieList" :key="item.id">
          <MovieCart :movie="item"/>
        </div>
    </div>
    <MovieLoading v-else />
    <div class="mb-20">
    <div class="text-center">
      <button><span class="text-gray-400 ">Previous Page</span></button> <span class="mx-7 inline-block">|</span> <button><span class="text-blue-500">Next Page</span></button>
    </div>
    <div class="text-gray-400 mt-6 text-center">
      <span>Showing Results </span> <span> 1</span> - <span>20</span>
    </div>
    </div>
</div>
</template>

<script>
import Search from '~/components/search'
import MovieCart from '~/components/movieCart'
import MovieLoading from '~/components/movieLoading'
import { mapActions } from 'vuex'; 

export default {
  components:{
    Search,
    MovieCart,
    MovieLoading
  },
  data(){
    return {
      movieList:[],
      pagination:{
        total:0,
        skip:0
      }
    }
  },
  computed:{
  },
  async mounted(){
    let response = await this.getMovieList();
    await this.getGenreList();
    this.total = response?.total_results || 0;
    this.movieList = response?.results || [];
  },
  methods:{
    ...mapActions(['getMovieList','getGenreList']),
  },
}
</script>

