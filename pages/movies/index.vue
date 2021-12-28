<template>
<div>
    <Search @search-release-date="searchReleaseDate"/>
    <div v-if="!fetchingData" class="container mx-auto mt-30 grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4 mb-40 max-w-5xl">
        <div v-for="item in movieList" :key="item.id">
          <MovieCart :movie="item"/>
        </div>
    </div>
    <MovieLoading v-else />
    <Pagination v-if="movieList.length" @update-page="updatePage" :total="pagination.total" :page="pagination.page"/>
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
      fetchingData:false,
      movieList:[],
      query:'',
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
    this.fetchingData = true
    await this.getGenreList();
    await this.fetchData()
    this.fetchingData = false
  },
  methods:{
    ...mapActions(['getMovieList','getGenreList']),
    searchReleaseDate(dateRange) {
     const startDate = moment(dateRange?.[0]).format("YYYY-MM-DD");
      const endDate = moment(dateRange?.[1]).format("YYYY-MM-DD");
      this.query = startDate ? `${this.query}primary_release_date.gte=${startDate}&`: ''
      this.query = endDate ?  `${this.query}primary_release_date.lte=${endDate}&` : this.query
      this.fetchData()
    },
    updatePage(type){
      if(type==='next'){
        this.pagination.page++ 
      } else {
        this.pagination.page-- 
      }
      this.query = `${this.query}page=${this.pagination.page}&`
      this.fetchData()
    },
    async fetchData(){
      this.fetchingData = true;
      let response = await this.getMovieList(this.query);
      this.pagination.total = response?.total_pages || 0;
      this.movieList = response?.results || [];
      this.fetchingData = false;
    }
  },
}
</script>

