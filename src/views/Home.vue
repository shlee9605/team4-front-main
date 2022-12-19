<template>
<b-container class="home">
  <h1 style="padding: 20px">{{ this.tokenUser.name }}님, 반갑습니다!</h1>
  <b-row>
    <b-col sm="8">
      <div style="margin-left: 10px">
        <naver-map id="navermap" />
      </div>
    </b-col>
    <b-col sm="4">
      <b-calendar
        selected-variant="success"
        today-variant="info"
        nav-button-variant="primary"
      ></b-calendar>
    </b-col>
  </b-row>
  <b-row style="padding: 10px">
    <b-col sm>
    <b-card>
    <h2>About SmartFactory Solution</h2>
    <p>asdkfjqe;ovnrq;ejkndv;kqejvnb;oerkjg;lkebj;qlejgbl;ekjvbdfgbsfbsffffffffffffffffffffffffffffffffff</p>
    </b-card>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import NaverMap from '../components/NaverMap.vue'

export default {
  components: {
    'naver-map': NaverMap
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .b-calendar .b-calendar-inner {
    min-width: 300px;
    background-color: #fff !important;
}

/deep/ .card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 2rem;
  min-width: 100vh;
}

/deep/ .row {
  display: flex;
  flex-wrap: wrap;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
</style>
