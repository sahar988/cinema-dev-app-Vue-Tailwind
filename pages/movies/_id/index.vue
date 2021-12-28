<template>
  <div class="container mx-auto my-16 max-w-5xl">
    <div class="flex light-gray h-2 w-full h-20 pr-6 rounded-md pl-20 justify-between items-center title-box">
      <div class="flex items-center">
        <button class="rounded-3xl bg-blue-400 h-10 text-white p-2 px-4" @click="$router.back()">Back</button>
        <div class="ml-16 text-lg title-box__caption">
          <nuxt-link to="/movies">
            <div class="font-bold"> {{movie.title}} </div>
            <span>{{movie.tagline}}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <MovieLoading v-if="!movie.id" class="mt-20"/>
    <div v-else class="px-6">
      <div class="flex justify-start mt-20 detail-wrapper">
        <img class="rounded-xl w-72 h-96" :src="getImageUrl(movie.poster_path)">
        <div class="flex w-screen justify-around flex-col pl-10 pr-6">
          <div class="detail__items">
            <strong>Budget</strong> 
            <span>{{movie.budget | comma}}</span>
          </div>
          <div class="detail__items">
            <strong>Revenue</strong> 
            <span>{{movie.revenue | comma}}</span>
          </div>
          <div class="detail__items">
            <strong>Release Date</strong> 
            <span>{{movie.release_date}}</span>
          </div>
          <div class="detail__items">
            <strong>Runtime</strong> 
            <span>{{movie.runtime}}</span>
          </div>
          <div class="flex justify-between items-center">
            <strong>Score</strong> 
            <div class="flex">
              <Rating class="mr-2" :value="movie.vote_average" :total="10"/>
              <span class="mr-2">{{movie.vote_average}}</span>
              <div v-if="movie.vote_count" class="text-right">({{movie.vote_count}} votes)</div>
            </div>
          </div>
          <div class="detail__items">
            <strong>Genres</strong> 
            <div class="text-sm text-right break-all"><span v-for="genre in movie.genres" :key="genre.id">{{genre.name}},</span></div>
          </div>
          <div class="detail__items">
            <strong>IMDB Link</strong> 
            <a :href="`https://www.imdb.com/title/${this.movie.imdb_id}`" class="text-blue-400 underline"><span>Link</span></a>
          </div>
          <div class="detail__items">
            <strong>Homepage Link</strong> 
            <a :href="movie.homepage" class="text-blue-400 underline"> <span>Link</span></a>
          </div>
        </div>
      </div>
      <p class="mt-16 mb-20">
        {{movie.overview}}
      </p>
      <div>
        <strong class="block mb-3">Credit</strong>
        <span class="text-sm" v-for="cast in topCredits" :key="cast.cast_id">{{cast.name}} ,</span><span v-if="otherCreditsCount">and {{otherCreditsCount}} more.</span>
    </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import movieMixin from '~/mixins/movieMixin'
import MovieLoading from '~/components/movieLoading'
import Rating from '~/components/rating'

export default {
  filters:{
    comma(value){
      return `$${value?.toString?.().replace(/\B(?=(\d{3})+(?!\d))/g, '’') || ''}`;
    }
  },
  components:{
    MovieLoading,
    Rating
  },
  mixins:[movieMixin],
  data(){
    return {
      movie:{},
      credits:[],
      numberOfTopCredit:10
    }
  },
  computed:{
    topCredits(){
      if(this.credits?.cast?.length > this.numberOfTopCredit){

        let topTenPopular = this.credits?.cast.sort((a, b) => {
          return b.popularity - a.popularity
        });
        topTenPopular.splice(this.numberOfTopCredit)
        return topTenPopular
      }
      return this.credits?.cast || []
    },
    otherCreditsCount(){
      let totalStaff = this.credits?.cast?.length + this.credits?.crew?.length
      return  (totalStaff - this.numberOfTopCredit) || 0
    }
  },
  async mounted(){
    if(this.$route?.params?.id){
      let response = await this.getMovieDetail(this.$route.params.id);
      this.movie = response || {}
      this.credits = await this.getMovieCredit(this.$route.params.id)
    } else {
     this.error({
      statusCode: 404,
      message: `this Movie is not defined!`
    })
    }
  },
  methods:{
    ...mapActions('movie',['getMovieDetail','getMovieCredit']),
  }
}
</script>
<style scoped lang="scss">
.detail{
  &__items {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
}

@media screen and (max-width:768px) {
  .detail-wrapper {
    flex-direction: column;
    align-items: center;
  }

  img {
    margin-bottom: 20px;
  }

  .title-box {
    padding-left: 40px;
    &__caption {
      font-size: 14px;
      margin: 0;
      margin-left: 20px;
    }
  }
}
</style>