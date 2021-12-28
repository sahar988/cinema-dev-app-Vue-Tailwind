<template>
<div class="container mx-auto my-16 max-w-5xl">
  <div class="flex light-gray h-2 w-full h-20 pr-6 rounded-md pl-20 justify-between items-center">
    <div class="flex items-center">
      <span> search by release date:</span> 
      <client-only>
        <date-picker v-model="selectedReleaseDate" type="date" range placeholder="Select date range"
        class="ml-6"
        ></date-picker>
      </client-only> 
    </div>
    <button class="rounded-3xl bg-blue-400 h-10 text-white py-2 px-4" @click="search()">Save Changes</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'IndexPage',
  data(){
    return {
      selectedReleaseDate: {
        startDate:'',
        endDate:''
      }
    }
  },
  methods:{
    search() {
      //searchResult.items = [certData1, certData2];
      this.$emit('search-release-date',this.selectedReleaseDate || [])
    },
  }
}
</script>

<style>
.nuxt-logo {
  height: 180px;
}
.light-gray {
  background: #E2E2E2;
}
</style>
