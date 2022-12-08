<template>
  <div>
    <div style="margin-top: 80px">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card title="로그인">
            <b-form-group label-cols="4" label-cols-lg="3" label="아이디" label-for="input-userid">
              <b-form-input id="input-userid" v-model="userid"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="패스워드" label-for="input-password">
              <b-form-input id="input-password" v-model="password" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="">
              <b-button variant="primary" :disabled="loading" @click="onSubmit"
                ><b-spinner v-if="loading" small></b-spinner> 로그인</b-button
              >
              <b-button variant="link" @click="onClickAddNew">회원가입</b-button>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <signupform />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import signupform from './signupform.vue'

export default {
  components: {
    signupform: signupform
  },
  data() {
    return {
      userid: null,
      password: null
    }
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.TokenError
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 회원가입 후 처리

      if (value !== null) {
        if (value > 0) {
          // 회원가입이 성공한 경우

          // 메세지 출력
          this.$bvToast.toast('회원가입 되었습니다. 관리자의 승인을 기다리세요.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
        } else {
          // 회원가입이 실패한 경우
          this.$bvToast.toast('회원가입이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    tokenUser(value) {
      if (value && value.id && value.id > 0 && value.role !== '대기') {
        // 로그인이 완료된 상황
        this.$router.push('/home') // 메인 페이지 이동
      } else if (value.id !== null) {
        console.log(value)
        // 회원가입 '대기'상태인 경우 메세지 출력
        this.$bvToast.toast('관리자의 승인이 필요합니다.', {
          title: '관리자 승인 필요',
          variant: 'danger',
          solid: true
        })
      }
    },
    error(errValue) {
      // console.log(errValue.response.status)
      if (errValue !== null) {
        // 아이디/비밀번호가 실패했을 경우 메세지 출력
        this.$bvToast.toast('아이디/비밀번호를 확인해 주세요.', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우
        this.$router.push('/home') // 메인 페이지 이동
      } else {
        // 토큰이 만료된 경우
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('authLogin', { userid: this.userid, password: this.password })
    },
    onClickAddNew() {
      // 1. 상세 정보 초기화
      this.$store.dispatch('actUserInit')

      // 2. 모달 출력
      this.$bvModal.show('modal-signup-inform')
    }
  }
}
</script>

<style lang="scss" scoped></style>
