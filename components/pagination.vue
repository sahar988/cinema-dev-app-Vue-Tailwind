<template>
<div class="mb-20" >
      <div class="text-center">
        <button :disabled="page <= 1" @click="$emit('update-page','prev')"><span :class="[page > 1 ? 'text-blue-500' : 'text-gray-400']">Previous Page</span></button>
        <span class="mx-7 inline-block">|</span>
        <button @click="$emit('update-page','next')" :disabled="page === total"><span :class="[page !== total ? 'text-blue-500' : 'text-gray-400']">Next Page</span></button>
      </div>
      <div class="text-gray-400 mt-6 text-center">
        <span class="mr-2">Showing Results</span><span>{{page}}</span> - <span>{{total}}</span>
      </div>
    </div>
</template>

<script>
export default {
    name:'Pagination',
    props:{
      total:{
        type:Number,
        default:0
      },
      page:{
        type:Number,
        default:1
      }
    }
}
</script>