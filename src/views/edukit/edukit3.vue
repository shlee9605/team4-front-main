<template>
  <div>
    <h1>본부 기계 1</h1>
    <div ref="webgl"></div>
  </div>
</template>

<script>
import Three from '@/js/example.js'

export default {
  mounted() {
    Three(this.$refs.webgl)
  }
}
</script>

<style lang="scss" scoped></style>
