<template>
  <div class="navermap">
    <naver-maps style="border-radius:2rem" :height="height" :mapOptions="mapOptions" :initLayers="initLayers" @load="onLoad">
      <!-- <naver-info-window
        class="info-window"
        @load="onWindowLoad"
        :isOpen="info"
        :marker="marker">
        <div class="info-window-container">
          <h5>UVC</h5>
        </div>
      </naver-info-window> -->
      <naver-marker
        id="metacamp"
        :lat="37.4956949"
        :lng="127.0301538"
        @click="onMetacampMarkerClicked"
        @load="onMetacampMarkerLoaded"
      />
      <naver-marker
        id="uvc"
        :lat="37.396358952157"
        :lng="126.97019328808"
        @click="onUVCMarkerClicked"
        @load="onUVCMarkerLoaded"
      />
    </naver-maps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markerClicked: {
        UVC: false,
        metacamp: false
      },
      deviceUVC: 'uvc',
      deviceMetacamp: 'metacamp',
      // width: auto,
      height: 500,
      info: false, // true일경우 정보열기, false일경우 정보닫기
      info2: false,
      marker: null,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 37.5009759,
        lng: 127.0373502,
        zoom: 10,
        zoomControl: true, //boolean
        zoomControlOptions: { position: 3 }, //string
        mapTypeControl: true
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH']
    }
  },
  methods: {
    onLoad(vue) {
      this.map = vue
      console.log('지도를 불러왔습니다.')
    },
    onWindowLoad() {},
    onMetacampMarkerClicked(event) {
      this.info = !this.info // isopen값을 변경하여 정보창 컨트롤
      this.markerClicked.metacamp = true
      this.$EventBus.$emit('markerMetacamp', this.deviceMetacamp)
    },
    onMetacampMarkerLoaded(vue) {
      this.marker = vue.marker
    },
    onUVCMarkerClicked(vue) {
      this.info = !this.info // isopen값을 변경하여 정보창 컨트롤
      this.markerClicked.UVC = true
      this.$EventBus.$emit('markerUVC', this.deviceUVC)
    },
    onUVCMarkerLoaded(vue) {
      this.marker = vue.marker
    }
  },
  mounted() {
    setInterval(() => this.count++, 1000)
  }
}
</script>

<style scoped>
.info-window-container {
  padding: 10px;
  width: 150px;
  height: 30px;
  text-align: center;
}
</style>
