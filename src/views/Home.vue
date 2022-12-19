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
    <b-col sm style="padding-top: 80px">
    <b-card>
    <h2 style="padding-bottom: 50px">About Prime Factory</h2>
    <div class="row text-center">
              <div class="col-md-3" style="margin-bottom: 8vh">
                <b-avatar class="profile-user-img" size="200px">
                  <img class="img-fluid" src="@/assets/wolf.jpg" />
                </b-avatar>
                <h4 class="my-3">승호</h4>
                <p class="text-muted"># Chief Developer<br /></p>
              </div>

              <div class="col-md-3" style="margin-bottom: 8vh">
                <b-avatar class="profile-user-img" size="200px">
                  <img class="img-fluid" src="@/assets/owl.jpg" />
                </b-avatar>
                <h4 class="my-3">애니</h4>
                <p class="text-muted"># Frontend Developer<br /></p>
              </div>

              <div class="col-md-3" style="margin-bottom: 8vh">
                <b-avatar class="profile-user-img" size="200px">
                  <img class="img-fluid" src="@/assets/tiger.jpg" />
                </b-avatar>
                <h4 class="my-3">상훈</h4>
                <p class="text-muted"># Frontend Developer<br /></p>
              </div>

              <div class="col-md-3" style="margin-bottom: 8vh">
                <b-avatar class="profile-user-img" size="200px">
                  <img class="img-fluid" src="@/assets/cat.jpg" />
                </b-avatar>
                <h4 class="my-3">태환</h4>
                <p class="text-muted"># Backend Developer<br /></p>
              </div>

    </div>



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

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

</style>
