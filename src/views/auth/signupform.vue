<template>
  <b-modal id="modal-signup-inform" title="회원가입" @ok="onSubmit">
    <b-form-group label="이름" label-for="name" label-cols="3">
      <b-form-input id="name" v-model="user.name"></b-form-input>
    </b-form-group>
    <b-form-group label="아이디" label-for="userid" label-cols="3">
      <b-form-input id="userid" v-model="user.userid"></b-form-input>
    </b-form-group>
    <b-form-group label="비밀번호" label-for="password" label-cols="3">
      <b-form-input id="password" v-model="user.password" type="password"></b-form-input>
    </b-form-group>
    <b-form-group label="이메일" label-for="email" label-cols="3">
      <b-form-input id="email" v-model="user.email"></b-form-input>
    </b-form-group>
    <b-form-group label="전화번호" label-for="phone" label-cols="3">
      <b-form-input id="phone" v-model="user.phone"></b-form-input>
    </b-form-group>

    <template #modal-footer="{ ok, cancel }">
      <b-button size="sm" variant="success" @click="ok()">등록 </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        userid: null,
        password: null,
        email: null,
        phone: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    }
  },
  watch: {
    infoData(value) {
      this.user = { ...value }
    }
  },
  created() {
    this.user = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('actUserSignUp', this.user) // 입력 실행
      console.log(this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .modal-content {
  background-color: transparent;
}
/deep/ .modal-header {
  background-color: #1d1b31;
  color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}
/deep/ .modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
  color: #fff;
}
/deep/ .modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 3rem;
  background-color: #fff;
}
/deep/ .modal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 1.2rem;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 9px;
  background-color: #1d1b31;
}
/deep/ .button.close {
  color: #fff;
  background-color: transparent;
}
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  /* text-shadow: 0 1px 0 #fff; */
  opacity: 0.8;
}
.close:hover {
  color: #fff;
}
</style>
