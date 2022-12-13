<template>
  <div>
    <b-navbar toggleable="lg" type="light" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)">
      <b-navbar-brand href="/">VUEPROJ</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-for="dep in this.departmentList" @click="onClick(`/edukit/${dep.code}/${dep.topic}`)">
            {{ `${dep.name} 기계` }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="isLoggedin" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ tokenUserName }}</em>
            </template>
            <b-dropdown-item href="#" @click="onClick('/profile')">프로필</b-dropdown-item>
            <b-dropdown-item href="#" @click="onClick('/auth/logout')">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
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
      return this.$store.getters.DepartmentList // 부서정보 가져오기
    }
  },
  created() {
    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  methods: {
    onClick(path) {
      this.$router.push(path).catch(() => {
        alert('잘못된 접근입니다.')
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
