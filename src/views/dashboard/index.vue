<template>
  <div id="divReloadLayer">
    <h1>대시보드</h1>
    <div  class="dashBoard">
      <iframe src="http://192.168.0.62:3000/d-solo/XiUQrvc4z/edukit1-bulryangryul?orgId=1&from=1671078574291&to=1671079474291&panelId=7&refresh=1s" width="450" height="200" frameborder="0"></iframe>
      <iframe src="http://192.168.0.62:3000/d-solo/c8hYkdcVz/edukit2-bulryangryul?orgId=1&from=1670965638337&to=1670987238337&panelId=2&refresh=1s" width="450" height="200" frameborder="0"></iframe>
    </div>  
    <div class="dashBoard">
      <iframe src="http://192.168.0.62:3000/d-solo/mIowkd54z/edukit1-sigandaebi-saengsanryang?orgId=1&from=1670965615318&to=1670987215318&panelId=2&refresh=1s" width="450" height="200" frameborder="0"></iframe>
      <iframe src="http://192.168.0.62:3000/d-solo/pg4lzO54z/edukit2-sigandaebi-saengsanryang?from=1670965663349&to=1670987263349&orgId=1&panelId=2&refresh=1s" width="450" height="200" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
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
