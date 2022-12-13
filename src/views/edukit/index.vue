<template>
  <div>
    <h1 v-for="dep in this.departmentList" v-if="dep.code == $route.params.depCode">{{ `${dep.name} 기계` }}</h1>
    <div ref="webgl"></div>
  </div>
</template>

<script>
import Three from '@/js/example.js'

export default {
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList // 부서정보 가져오기
    }
  },
  created() {
    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  mounted() {
    Three(this.$refs.webgl)
  }
}
</script>

<style lang="scss" scoped></style>
