<template>
<div>
    <app-header class="header" v-if="this.$route.meta.header !== false" />
    <!-- 동일한 컴포넌트를 재사용하기 위해 고유의 키값을 넣는다 (이전 Vue버젼의 canReuse와 동일한 기능) -->
    <router-view :key="$route.path" />
</div>
</template>

<script>
import Header from './components/layout/Header'

export default {
  components: {
    'app-header': Header,
  }
}
</script>

<style src="./assets/style/main.css">
</style>
