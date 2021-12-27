import { mapState, mapActions } from 'vuex'; 
import { IMAGE_URL } from '~/utility/endpoints'

export default{
    //data(){
    //    return{
    //        movieGenres:[]
    //    }
    //},
    computed:{
    //    ...mapState(['genreList'])
    },
    mounted(){
    //    if(!this.genreList?.length)
    //        this.getGenreList();
    //
    },
    methods:{
        //...mapActions(['getGenreList']),
        //retrieveGenreFromMovie(genres) {
        //        this.movieGenres = (this.genreList || []).filter(function(genre) {
        //          return (genres||[]).indexOf(genre.id) != -1;
        //        });
        //    }
        getImageUrl (path, w=500){
            return `${IMAGE_URL}/w${w}${path}`
        }
    }
}