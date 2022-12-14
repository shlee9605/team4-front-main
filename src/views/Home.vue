<template>
  <div>
    <h1 @click="getCurrentPosition">Welcome!</h1>

    <!-- 네이버지도 호출 -->
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :useStyleMap="useStyleMap"
      :initLayers="initLayers"
      @load="onLoad"
    >
      <!-- 정보창 -->
      <naver-info-window class="info-window" @load="onWindowLoad" :isOpen="info" :marker="marker"> </naver-info-window>

      <!-- 마커 -->
      <naver-marker :lat="37" :lng="127" @click="onMarkerClicked" @load="onMarkerLoaded" />
    </naver-maps>
  </div>
</template>

<script>
export default {
  name: 'naverMap',
  data() {
    return {
      myPositionObj: {
        latitude: null,
        longitude: null
      },
      useStyleMap: true,
      width: null,
      height: 500,
      info: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 50, //this.myPositionObj.latitude,
        lng: 50, //this.myPositionObj.longitude,
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: { position: this.naver.maps.Position.TOP_RIGHT },
        mapTypeControl: true,
        mapTypeControlOptions: { style: this.naver.maps.MapTypeControlStyle.DROPDOWN }
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  // created() {
  //   // 페이지가 처음 열렸을 때 현재 위치 호출
  //   // this.getCurrentPosition()
  // },
  methods: {
    onLoad(vue) {
      this.map = vue
    },
    onWindowLoad(that) {},
    onMarkerClicked(event) {
      this.info = !this.info
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker
    }

    // geolocation API를 활용하여 현재 위치 좌표 호출
    // getCurrentPosition () {
    //   if (!navigator.geolocation) {
    //     console.log('위치 정보를 찾을 수 없습니다.') // 위치파악이 안될 경우
    //   } else {
    //     navigator.geolocation.getCurrentPosition(this.getPositionValue, this.geolocationError)
    //   }
    // },
    // // 1. 현재 좌표를 각 변수에 저장
    // getPositionValue(val) {
    //   this.myPositionObj.latitude = val.coords.latitude
    //   this.myPositionObj.longitude = val.coords.longitude
    //   console.log(this.myPositionObj)
    // },
    // // 2. getCurrentPosition()에서 else문을 타서도 에러가 생길경우
    // geolocationError() {
    //   this.setAlert('no location!!')
    // },
    // setAlert (text) {
    //   alert(text)
    // }

    // var location = new naver.maps.LatLng(position.coords.latitude,
    //                                      position.coords.longitude);

    // map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    // map.setZoom(10); // 지도의 줌 레벨을 변경합니다.

    // infowindow.setContent('<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>');

    // infowindow.open(map, location);
  }
}
</script>
<style scoped>
/* .info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
} */
</style>
