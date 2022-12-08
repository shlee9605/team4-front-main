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

      <template #modal-footer="{ok, cancel}">
        <b-button size="sm" variant="success" @click="ok()">등록
        </b-button>
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
          phone: null,
        },
      }
    },
    computed: {
      infoData() {
        return this.$store.getters.User
      }
    },
    watch: {
      infoData(value) {
        this.user = {...value}
      }
    },
    created() {
      this.user = {...this.infoData}
    },
    methods: {
      onSubmit() {
          this.$store.dispatch('actUserSignUp', this.user) // 입력 실행
          console.log(this.user)
        }
        
      },
  }
  </script>
  
  <style lang="scss" scoped></style>
  