<template>
  <div>
    <h1 v-for="dep in this.departmentList" v-if="dep.code == $route.params.depCode">{{ `${dep.name} 기계` }}</h1>
    <div ref="webgl"></div>
    <div>
      <b-button v-if="modalShow1 == true" v-b-modal.modal-streaming1 variant="success" size="sm">stream1</b-button>
      <b-button v-if="modalShow2 == true" v-b-modal.modal-streaming2 variant="success" size="sm">stream2</b-button>
    </div>
    <!-- streaming modal 영역 -->
    <StreamingModal />
  </div>
</template>

<script>
import Three from '@/js/example.js'
import StreamingModal from './StreamingModal'

export default {
  data() {
    return {
      modalShow1: false,
      modalShow2: false
    }
  },
  components: {
    StreamingModal: StreamingModal
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList // 부서정보 가져오기
    },
    modalCheck() {
      if (this.$route.params.depCode == 'uvc') {
        this.modalShow2 = true
        return this.modalShow2
      } else if (this.$route.params.depCode == 'metacamp') {
        this.modalShow1 = true
        return this.modalShow1
      }
    }
  },
  created() {
    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  mounted() {
    Three(this.$refs.webgl)
  },
  watch: {
    modalCheck() {
      if (this.$route.params.depCode == 'uvc') {
        this.modalShow2 = true
      } else if (this.$route.params.depCode == 'metacamp') {
        this.modalShow1 = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
