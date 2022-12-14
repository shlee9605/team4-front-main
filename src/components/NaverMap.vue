<template>
  <div>
    <naver-maps
      :height="height"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad">
      <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker">info
      </naver-info-window>
      <naver-marker id="bootcamp" :lat="37.4956949" :lng="127.0301538" @click="onMarkerClicked" @load="onMarkerLoaded"/>
      <naver-marker id="uvc" :lat="37.396358952157" :lng="126.97019328808" @click="onMarkerClicked" @load="onMarkerLoaded"/>
    </naver-maps>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // width: auto,
        height: 500,
        info: false, // true일경우 정보열기, false일경우 정보닫기
        marker: null,
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 37.5009759,
          lng: 127.0373502,
          zoom: 10,
          zoomControl: true, //boolean
          zoomControlOptions: {position: 'TOP_RIGHT'}, //string
          mapTypeControl: true,
        },
        initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
      }
    },
    methods: {
      onLoad(vue)
      {
        this.map = vue;
      },
      onWindowLoad(that) {
        // console.log(this)
        console.log('open?')
        console.log(that)
      },
      onMarkerClicked(event) {
        this.info = !this.info;
        console.log(this.info)
      },
      onMarkerLoaded(vue) {
        this.marker = vue.marker;
      }
    },
    mounted() {
      setInterval(() => this.count++, 1000);
    }
  }
</script>
<style scoped>
</style>