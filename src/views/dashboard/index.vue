<template>
  <div id="divReloadLayer">
    <h1>대시보드</h1>
    <div  class="dashBoard">
      <iframe :src="VUE_APP_GRAFANA1_1" width="450" height="200" frameborder="0"></iframe>
      <iframe :src="VUE_APP_GRAFANA2_1" width="450" height="200" frameborder="0"></iframe>
    </div>  
    <div class="dashBoard">
      <iframe :src="VUE_APP_GRAFANA1_2" width="450" height="200" frameborder="0"></iframe>
      <iframe :src="VUE_APP_GRAFANA2_2" width="450" height="200" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VUE_APP_GRAFANA1_1: `${process.env.VUE_APP_GRAFANA}/d-solo/XiUQrvc4z/edukit1?from=1671153417671&to=1671155217673&orgId=1&panelId=7&refresh=1s`,
      VUE_APP_GRAFANA2_1: `${process.env.VUE_APP_GRAFANA}/d-solo/c8hYkdcVz/edukit2-bulryangryul?orgId=1&from=1671135797141&to=1671157397141&panelId=2&refresh=1s`,
      VUE_APP_GRAFANA1_2: `${process.env.VUE_APP_GRAFANA}/d-solo/mIowkd54z/edukit1-sigandaebi-saengsanryang?orgId=1&from=1670965615318&to=1670987215318&panelId=2&refresh=1s`,
      VUE_APP_GRAFANA2_2: `${process.env.VUE_APP_GRAFANA}/d-solo/pg4lzO54z/edukit2-sigandaebi-saengsanryang?from=1670965663349&to=1670987263349&orgId=1&panelId=2&refresh=1s`
    }
  },
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
