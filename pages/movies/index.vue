<template>
<div>
    <Search @search-release-date="searchReleaseDate"/>
    <div v-if="movieList.length" class="container mx-auto mt-30 grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4 mb-40 max-w-5xl">
        <div v-for="item in movieList" :key="item.id">
          <MovieCart :movie="item"/>
        </div>
    </div>
    <MovieLoading v-else />
    <div class="mb-20" v-if="movieList.length">
      <div class="text-center">
        <button :disabled="pagination.page <= 1" @click="updatePage('prev')"><span :class="[pagination.page > 1 ? 'text-blue-500' : 'text-gray-400']">Previous Page</span></button>
        <span class="mx-7 inline-block">|</span>
        <button @click="updatePage('next')" :disabled="pagination.page === pagination.total"><span :class="[pagination.page !== pagination.total ? 'text-blue-500' : 'text-gray-400']">Next Page</span></button>
      </div>
      <div class="text-gray-400 mt-6 text-center">
        <span class="mr-2">Showing Results</span><span>{{pagination.page}}</span> - <span>{{pagination.total}}</span>
      </div>
    </div>
</div>
</template>

<script>
import Search from '~/components/search'
import MovieCart from '~/components/movieCart'
import MovieLoading from '~/components/movieLoading'
import Pagination from '~/components/pagination'
import { mapActions } from 'vuex'; 
import moment from 'moment'

export default {
  components:{
    Search,
    MovieCart,
    MovieLoading,
    Pagination
  },
  data(){
    return {
      movieList:[],
      pagination:{
        total:0,
        //skip:0,
        page:1,
        //take:20
      }
    }
  },
  computed:{
  },
  async mounted(){
    await this.getGenreList();
    this.fetchData()
  },
  methods:{
    ...mapActions(['getMovieList','getGenreList']),
    searchReleaseDate(dateRange) {
      const startDate = moment(dateRange?.[0]).format("YYYY-MM-DD");
      const endDate = moment(dateRange?.[1]).format("YYYY-MM-DD");

      const filteredMovies = this.movieList.filter(item =>{
        return (startDate < item.release_date &&  item.release_date < endDate)
      })
      this.movieList = filteredMovies
    },
    updatePage(type){
      if(type==='next'){
        this.pagination.page++ 
      } else {
        this.pagination.page-- 
      }
      const query = `page=${this.pagination.page}`
      this.fetchData(query)
    },
    async fetchData(query=''){
      let response = await this.getMovieList(query);
      this.pagination.total = response?.total_pages || 0;
      this.movieList = response?.results || [];
    }
  },
}
</script>

