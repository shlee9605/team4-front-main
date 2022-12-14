<template>
  <div id="divReloadLayer">
    <h1 @click="reloading()">대시보드</h1>
    <!-- <div>장비: {{ selected.deviceName }}</div>
    <div>태그: {{ selected.tagList }}</div> -->
    <div  class="dashBoard">
      <iframe src="http://192.168.0.62:3000/d-solo/XiUQrvc4z/eduki1-bulryangryul?orgId=1&from=1670987286078&to=1670987586078&panelId=2" width="450" height="200" frameborder="0"></iframe>
      <iframe src="http://192.168.0.62:3000/d-solo/mIowkd54z/edukit1-sigandaebi-saengsanryang?orgId=1&from=1670965615318&to=1670987215318&panelId=2" width="450" height="200" frameborder="0"></iframe>
    </div>  
    <div class="dashBoard">
      <iframe src="http://192.168.0.62:3000/d-solo/c8hYkdcVz/edukit2-bulryangryul?orgId=1&from=1670965638337&to=1670987238337&panelId=2" width="450" height="200" frameborder="0"></iframe>
      <iframe src="http://192.168.0.62:3000/d-solo/pg4lzO54z/edukit2-sigandaebi-saengsanryang?from=1670965663349&to=1670987263349&orgId=1&panelId=2" width="450" height="200" frameborder="0"></iframe>
    </div>
    <!-- <div v-if="chartData">
      <line-chart ref="chart" :chart-data="chartData" :options="options" style="width: 500px"></line-chart>
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
    }
  },
  computed: {
    productId(){
      console.log(this.$store.getters.Dashboard.productId);
      this.$store.dispatch('actDashboardInfo', 2)
      console.log(this.$store.getters.Dashboard.productId);
      // () => $('#divReloadLayer').load(window.location.href+' #divReloadLayer');
    }
  },
  watch: {
    productId(value){
      if(value){
        // $("#divReloadLayer").load(window.location.href + " #divReloadLayer" )
        // $('#divReloadLayer').load(window.location+' #divReloadLayer')
        console.log("와치");
        // location.reload()
      }
      
    }
  },
  created() {
    this.$store.dispatch('actDashboardInfo', 2) // 토큰으로 유저 id 확인하여 정보 호출

  },
  methods: {
    reloading(){
      $("#divReloadLayer").load(window.location.href + "#divReloadLayer");
      console.log("실행");
    }
  }
}
</script>

<style lang="scss" scoped>
.dashBoard{
  margin-top: 3vh;
  width: 100%;
  height: 35vh;
  display : grid;
  // grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  align-items: center;
  justify-items: center;
  // border: 2px solid black;
  border: groove 10px;
  background-color : gray
}

</style>
