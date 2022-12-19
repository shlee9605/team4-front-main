<template>
  <div id="divReloadLayer">
    <b-container>
    <h1 class="title"><i class='bx bxs-dashboard bx-lg' style="padding-right: 10px"></i>대시보드</h1>
    <div  class="dashBoard">
      <iframe :src="VUE_APP_GRAFANA1_1" width="450" height="200" frameborder="0"></iframe>
      <iframe :src="VUE_APP_GRAFANA2_1" width="450" height="200" frameborder="0"></iframe>
    </div>  
    <div class="dashBoard">
      <iframe :src="VUE_APP_GRAFANA1_2" width="450" height="200" frameborder="0"></iframe>
      <iframe :src="VUE_APP_GRAFANA2_2" width="450" height="200" frameborder="0"></iframe>
    </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VUE_APP_GRAFANA1_1: process.env.VUE_APP_GRAFANA1_1,
      VUE_APP_GRAFANA2_1: process.env.VUE_APP_GRAFANA2_1,
      VUE_APP_GRAFANA1_2: process.env.VUE_APP_GRAFANA1_2,
      VUE_APP_GRAFANA2_2: process.env.VUE_APP_GRAFANA2_2,
    }
  },
}

</script>

<style lang="scss" scoped>
.dashBoard {
  margin-top: 3vh;
  width: 100%;
  height: 35vh;
  display: grid;
  // grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  align-items: center;
  justify-items: center;
  // border: 2px solid black;
  border: groove 10px;
  background-color: gray;
}

.title {
  padding-left: 24px;
  padding-top: 24px;
}
</style>
