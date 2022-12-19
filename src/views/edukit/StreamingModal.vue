<template>
  <div>
    <b-modal id="modal-streaming1" size="md" class="modal-content" title="실시간 보기">
      <div class="overflow">
        <!-- <iframe src="http://192.168.0.106:3002/stream" width="650px" height="500px" frameborder="0"></iframe> -->
        <iframe :src=this.VUE_APP_STREAM1 width="650px" height="500px" frameborder="0"></iframe>

    </div>
    </b-modal>

    <b-modal id="modal-streaming2" size="md" class="modal-content" title="실시간 보기">
      <div class="overflow">
        <!-- <iframe src="http://192.168.0.54:3002/stream" width="650px" height="500px" frameborder="0"></iframe> -->
        <iframe :src=this.VUE_APP_STREAM1 width="650px" height="500px" frameborder="0"></iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VUE_APP_STREAM1: null
    }
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList
    },
    checkHost() {
      for (let indx in this.departmentList) {
          console.log(this.departmentList[indx].host)
          if (this.departmentList[indx].code == this.$route.params.depCode) {
            (this.departmentList[indx].host)
            this.VUE_APP_STREAM1 = `http://${this.departmentList[indx].host}:3002/stream`
            console.log(this.VUE_APP_STREAM1)
          } else {
            console.log('no!')
          }
        }
      }
    },
  created() {
    this.$store.dispatch('actDepartmentList'),
    this.checkHost
  }
}
</script>

<style scoped lang="scss">
.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 135% !important;
    max-width: 135% !important;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}
.overflow {
  overflow-x: hidden
}
.modal .modal-50 {
  max-width: 60% !important;
  width: 60% !important;
  z-index: inherit;

}

</style>
