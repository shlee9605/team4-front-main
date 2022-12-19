<template>
  <div>
    <!-- <b-container> -->
    <h1 class="title" v-for="dep in this.departmentList" v-if="dep.code == $route.params.depCode"><i class='bx bxs-bolt-circle bx-lg' style="padding-right: 10px"></i>{{ `${dep.name} 기계` }}</h1>
    <div ref="webgl"></div>
    <div>
      <b-button v-if="modalShow1 == true" v-b-modal.modal-streaming1 variant="success" size="sm">stream1</b-button>
      <b-button v-if="modalShow2 == true" v-b-modal.modal-streaming2 variant="success" size="sm">stream2</b-button>
    </div>
    <!-- </b-container> -->
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
    getBoolean() {
      console.log("여기까지 오는거지", this.$store.getters.VisionObjectClick);
      return this.$store.getters.VisionObjectClick
    },
  },
  created() {
    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  mounted() {
    Three(this.$refs.webgl)
  },
  watch: {
    getBoolean(value){
      if(value){
        this.modalCheck()
        this.$store.commit('setVisionObjectFalse')
      }
    }
  },
  methods: {
    modalCheck() {
      if (this.$route.params.depCode == 'uvc') {
        this.modalShow2 = true
        this.$bvModal.show("modal-streaming2")
      } else if (this.$route.params.depCode == 'metacamp') {
        this.modalShow1 = true
        this.$bvModal.show("modal-streaming1")
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding-left: 24px;
  padding-top: 24px;
  padding-bottom: 10px;
}
</style>
