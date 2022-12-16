<template>
  <div id="divReloadLayer">
    <h1>대시보드</h1>
    <div class="dashBoard">
      <iframe
        src="http://localhost:3000/d-solo/M1cu8pcVz/myedukit-device1-table?orgId=1&from=1671140321170&to=1671161921170&panelId=8&refresh=1s"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/M1cu8pcVz/myedukit-device1-table?orgId=1&from=1671140389321&to=1671161989322&panelId=10&refresh=1s"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
    </div>
    <div class="dashBoard">
      <iframe
        src="http://localhost:3000/d-solo/M1cu8pcVz/myedukit-device1-table?orgId=1&from=1671070293137&to=1671243093137&panelId=6&refresh=1s"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/M1cu8pcVz/myedukit-device1-table?orgId=1&from=1671070293137&to=1671243093137&panelId=12&refresh=1s"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
    </div>
    <iframe
      src="http://192.168.0.62:3000/d-solo/XiUQrvc4z/edukit?orgId=1&from=1670982139074&to=1670983039075&panelId=2"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {}
  }
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
</style>
