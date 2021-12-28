<template>
    <div class="flex">
        <img v-for="i in Math.floor(value)" :key="i+'_fill'" class="position-relative top-3" :src="require('~/assets/icons/filledStar.svg')" />
        <img v-if="!Number.isInteger(value)" class="position-relative top-3" :src="require('~/assets/icons/halfStar.svg')" />
        <img v-for="j in emptyStars" :key="j+'_empty'" class="position-relative top-3" :src="require('~/assets/icons/emptyStar.svg')" />
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type: Number,
            default:0
        },
        total:{
            type: Number,
            default: 10
        }
    },
    computed:{
        emptyStars(){
            let remainPoint = this.total-Math.floor(this.value)
            if(!Number.isInteger(this.value)) remainPoint--
            return remainPoint
        }
    }
}
</script>