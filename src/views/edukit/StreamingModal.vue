<template>
  <div>
    <b-modal id="modal-streaming1" class="modal-content" title="실시간 보기(Metacamp)">
      <div>
        <iframe src="process.env.VUE_APP_STREAM1" width="480px" height="450px" frameborder="0"></iframe>
      </div>
    </b-modal>

    <b-modal id="modal-streaming2" class="modal-content" title="실시간 보기(UVC)">
      <div>
        <iframe src="process.env.VUE_APP_STREAM2" width="480px" height="450px" frameborder="0"></iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.modal-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 130%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-dialog {
  max-width: 600px;
  max-height: 600px;
  margin: 1.75rem auto;
}
</style>
