<template>
  <div>
    <b-modal id="modal-streaming1" size="md" class="modal-content" title="실시간 보기(Metacamp)">
      <div class="overflow">
        <!-- <iframe src="http://192.168.0.106:3002/stream" width="650px" height="500px" frameborder="0"></iframe> -->
        <iframe :src="VUE_APP_STREAM1" width="650px" height="500px" frameborder="0"></iframe>

    </div>
    </b-modal>

    <b-modal id="modal-streaming2" size="md" class="modal-content" title="실시간 보기(UVC)">
      <div class="overflow">
        <!-- <iframe src="http://192.168.0.54:3002/stream" width="650px" height="500px" frameborder="0"></iframe> -->
        <iframe :src="VUE_APP_STREAM2" width="650px" height="500px" frameborder="0"></iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VUE_APP_STREAM1: process.env.VUE_APP_STREAM2,
      VUE_APP_STREAM2: process.env.VUE_APP_STREAM1,
    }
  },
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

/* .modal-dialog {
  max-width: 600px;
  max-height: 600px;
  margin: 1.75rem auto;
} */

</style>
