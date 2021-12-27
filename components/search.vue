<template>
<div class="container mx-auto my-16">
  <div class="flex light-gray h-2 w-full h-20 pr-6 rounded-md pl-20 justify-between items-center">
    <div class="flex items-center">
      <span> search by release date:</span> 
      <client-only>
           <date-range-picker
        v-model="datePickerSettings.dateRange"
        :locale-data="datePickerSettings.locale"
        :max-date="datePickerSettings.maxDate"
        ref="picker"
        @update="search"
        class="ml-6"
      >
        <template #ranges="ranges">
          <div class="ranges">
            <ul>
              <li
                v-for="(range, name) in datePickerSettings.ranges"
                :key="name"
                @click="ranges.clickRange(range)"
              >
                {{ name }}
              </li>
            </ul>
          </div>
        </template>
        <!--    footer slot-->
        <!-- <div slot="footer" @clickApply="alert('apply')" class="slot"></div> -->
      </date-range-picker>
      </client-only> 
    </div>
    <button class="rounded-3xl bg-blue-400 h-10 text-white p-2">Save Changes</button>
  </div>
</div>
</template>

<script>
  import DateRangePicker from 'vue2-daterange-picker';

const searchResult = {
  periodStart: "",
  periodEnd: "",
  // items: [certData1, certData2],
  items: [],
};
export default {
  name: 'IndexPage',
  components: { DateRangePicker },
  data(){
        let today = new Date();

    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let days6 = new Date();
    days6.setDate(today.getDate() - 6);

    return {
      datePickerSettings: {
        dateRange: {
          startDate: "01-01-2020",
          endDate: Date.now(),
        },
        minDate: "01-01-2020",
        maxDate: new Date(),
        ranges: {
          "today ": [today, today],
          "yesterday ": [yesterday, yesterday],
          "week": [days6, today],
          "this month": [
            new Date(today.getFullYear(), today.getMonth(), 1),
            today,
          ],
          "last month": [
            new Date(today.getFullYear(), today.getMonth() - 1, 1),
            new Date(today.getFullYear(), today.getMonth(), 0),
          ],
        },
        locale: {
          direction: "ltr",
          format: "dd.mm.yyyy",
          separator: " - ",
          applyLabel: "search",
          cancelLabel: "cancel",
          weekLabel: "W",
          firstDay: 1,
        },
      },
      selectedReleaseDate: {
        satartDate:new Date(),
        endDate:new Date()
      }
    }
  },
  mounted() {
    this.$refs.picker?.togglePicker(true);
  },
  methods:{
    updateValues(value){

    },
    search($event) {
      console.log(this.datePickerSettings.dateRange)
      //searchResult.items = [certData1, certData2];
    },
    clickCancel() {
      alert("clickCancel");
    },
    clickApply() {
      alert("clickApply ");
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
