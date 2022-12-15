<template>
  <div>
    <h2>{{ this.tokenUser.name }}님, 반갑습니다!</h2>
    <div class="navermap">
      <naver-map />
    </div>
  
  </div>
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
  },
}
</script>

<style scoped></style>
