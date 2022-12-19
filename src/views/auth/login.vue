<template>
  <div>
    <particles />
    <div class="container">
      <div>
      <b-img :src="require('@/assets/logo-img.png')" fluid width="200" height="auto"></b-img>
      </div>
      <!-- <validation-observer ref="observer" v-slot="{ handleSubmit }"> -->
        <b-form-group class="box">
          
          <!-- <h4>SMART FACTORY<br />SOLUTION</h4> -->
          
          <!-- <validation-provider name="userid" :rules="{ required: true }" v-slot="validationContext"> -->
            <b-form-input
              id="input-userid"
              v-model="userid"
              placeholder="아이디"
              autocomplete="off"
              state="getValidationState(validationContext)"
            >
            </b-form-input>
            <!-- <b-form-invalid-feedback id="input-userid-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback> -->
            <i class="typcn typcn-eye" id="eye"></i>
          <!-- </validation-provider> -->

          <!-- <validation-provider> -->
            <b-form-input
              id="input-password"
              v-model="password"
              placeholder="비밀번호"
              type="password"
              autocomplete="off"
            >
            </b-form-input>
            <b-button aria-disabled="true" class="btn1" @click="onSubmit"
              ><b-spinner v-if="loading" small></b-spinner>로그인</b-button
            >
          <!-- </validation-provider> -->
        </b-form-group>
        <a href="#" class="dnthave" @click="onClickAddNew">회원가입</a>
      <!-- </validation-observer> -->
    </div>
    <signupform />
  </div>
</template>

<!-- @keyup.enter.native="onSubmit" -->
<script>
import jwtDecode from 'jwt-decode'
import signupform from './signupform.vue'
import particles from '@/components/particles.vue'
import Particles from '../../components/particles.vue'

export default {
  components: {
    signupform: signupform,
    particles,
    Particles
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
      this.$store.dispatch('authLogin', {
        userid: this.userid,
        password: this.password
      })
      console.log(this.userid)
    },
    onClickAddNew() {
      // 1. 상세 정보 초기화
      this.$store.dispatch('actUserInit')

      // 2. 모달 출력
      this.$bvModal.show('modal-signup-inform')
    },
    keydownHandler(event) {
      if (event.which === 13) {
        this.onSubmit
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400');
@import url('https://fonts.googleapis.com/css2?family=Nabla&display=swap');

body,
html {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #1d243d;
  padding: 0;
  margin: 0;
}

.container {
  margin: 0;
  top: 8%;
  left: 50%;
  position: relative;
  text-align: center;
  transform: translateX(-50%);
  background-color: rgb(33, 41, 66);
  border-radius: 9px;
  border-top: 10px solid #79a6fe;
  border-bottom: 10px solid #8bd17c;
  width: 400px;
  height: 470px;
  box-shadow: 1px 1px 108.8px 19.2px rgb(25, 31, 53);
  transform: translate(-50%, 40%);
}

.box h4 {
  font-family: 'Nabla', cursive;
  color: #5c6bc0;
  font-size: 30px;
  margin-top: 94px;
  margin-bottom: 10%;
  font-weight: bold;
}

.box h4 span {
  color: #dfdeee;
  font-weight: lighter;
}

.box input[type='text'],
.box input[type='password'] {
  display: block;
  margin: 20px auto;
  background: #262e49;
  border: 0;
  border-radius: 5px;
  padding: 14px 10px;
  width: 320px;
  outline: none;
  color: #d6d6d6;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}
::-webkit-input-placeholder {
  color: #565f79;
}

.box input[type='text']:focus,
.box input[type='password']:focus {
  border: 1px solid #79a6fe;
}

a {
  color: #5c7fda;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.btn1 {
  border: 0;
  background: #7f5feb;
  color: #dfdeee;
  border-radius: 100px;
  width: 330px;
  height: 49px;
  font-size: 16px;
  position: absolute;
  top: 73%;
  left: 9%;
  transition: 0.3s;
  cursor: pointer;
}

.btn1:hover {
  background: #5d33e6;
}

.dnthave {
  position: absolute;
  top: 88%;
  left: 44%;
  font-size: 13px;
}

.error {
  background: #ff3333;
  text-align: center;
  width: 337px;
  height: 20px;
  padding: 2px;
  border: 0;
  border-radius: 5px;
  margin: 10px auto 10px;
  position: absolute;
  top: 31%;
  left: 7.2%;
  color: white;
  display: none;
}

.invalid-feedback {
    width: 100%;
    // margin-top: 0.25rem;
    font-size: 0.8em;
    // right: 80%;
    color: #ffc107b8;
}
</style>
