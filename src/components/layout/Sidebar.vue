<template>
  <div>
    <b-list-group>
      <b-list-group-item href="#" @click="onClick('/dashboard')">대시보드</b-list-group-item>
      <b-list-group-item v-if="tokenUserRole !== '팀원'" href="#" @click="onClick('/department')"
        >부서 관리</b-list-group-item
      >
      <b-list-group-item v-if="tokenUserRole !== '팀원'" href="#" @click="onClick('/user')"
        >사용자 관리</b-list-group-item
      >
      <!-- <b-list-group-item href="#" @click="$router.push('/device')">장비 관리</b-list-group-item> -->
    </b-list-group>
  </div>
</template>

<script>
export default {
  computed: {
    tokenUserRole() {
      return this.$store.getters.TokenUser.role
    }
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
<!-- v-if="tokenUserRole !== '팀원'" -->
