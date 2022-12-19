<template>
  <div class="header">
    <b-navbar toggleable="lg" type="light" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)">
      <b-navbar-brand href="#">PRIME FACTORY</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="#"
            v-for="dep in this.departmentList"
            v-if="dep.topic == null || dep.code == null"
            @click="onClick(`/edukit/NotFound`)"
            >{{ `${dep.name} ${dep.topic}` }}</b-nav-item
          >
          <b-nav-item href="#" v-else-if="deviceUVC == dep.code" @click="onClick(`/edukit/${dep.code}/${dep.topic}`)">{{
            `${dep.name} ${dep.topic}`
          }}</b-nav-item>
          <b-nav-item
            href="#"
            v-else-if="deviceMetacamp == dep.code"
            @click="onClick(`/edukit/${dep.code}/${dep.topic}`)"
            >{{ `${dep.name} ${dep.topic}` }}</b-nav-item
          >
          <b-nav-item href="#" v-else @click="onClick(`/edukit/${dep.code}/${dep.topic}`)"></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav v-if="isLoggedin" class="ml-auto"> -->

        <!-- </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceUVC: null,
      deviceMetacamp: null
    }
  },
  computed: {
    isLoggedin() {
      let login = false
      if (this.$store.getters.TokenUser && this.$store.getters.TokenUser.id > 0) {
        login = true
      }
      return login
    },
    tokenUserName() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
    },
    departmentList() {
      return this.$store.getters.DepartmentList
    }
  },
  created() {
    this.$store.dispatch('actDepartmentList') // 부서정보 조회

    // eventbus로 지도 마커 클릭 인식
    this.$EventBus.$on('markerUVC', res => {
      console.log(res)
      this.markerUVC()
    })
    this.$EventBus.$on('markerMetacamp', res => {
      console.log(res)
      this.markerMetacamp()
    })
  },
  methods: {
    onClick(path) {
      this.$router.push(path).catch(() => {
        alert('잘못된 접근입니다.')
      })
    },

    // 지도 마커 인식 될 시 맞는 부서코드로 반환하기 (uvc, metacamp만 넣음)
    markerMetacamp() {
      this.deviceUVC = null
      this.deviceMetacamp = 'metacamp'
      return this.deviceMetacamp // 부서코드 metacamp를 반환
    },
    markerUVC() {
      this.deviceMetacamp = null
      this.deviceUVC = 'uvc'
      return this.deviceUVC // 부서코드 uvc를 반환
    }
  }
}
</script>

<style lang="scss" scoped></style>
