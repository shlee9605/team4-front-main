<template>
  <div>
    <!-- <div class="separate-body"></div>
    <b-container fluid style="padding-left: 0px">
      <b-row>
        <!-- Side bar -->
          <app-sidebar class="sidebar"/>

      <b-container fluid>
        <!-- Body contents -->
        <!-- <app-header class="header" v-if="this.$route.meta.header !== false" /> -->
        <div class="content-body">
          <router-view :key="$route.path" />
        </div>
        </b-container>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'

export default {
  components: {
    'app-sidebar': Sidebar,
    'app-header': Header,
  }
}
</script>

<style lang="scss" scoped>
</style>
