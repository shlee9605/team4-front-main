import api from '../apiUtil'
import jwtDecode from 'jwt-decode'

const stateInit = {
  TokenUser: {
    id: null,
    userid: null,
    name: null,
    role: null,
    iat: null,
    exp: null
  }
}

export default {
  state: {
    TokenUser: { ...stateInit.TokenUser }, // token에서 추출한 사용자 정보
    Loading: false,
    Error: null
  },
  getters: {
    TokenUser: state => state.TokenUser,
    TokenLoading: state => state.Loading,
    TokenError: state => state.Error
  },
  mutations: {
    setTokenUser(state, data) {
      state.TokenUser = data
    },
    setLoading(state, data) {
      state.Loading = data
      state.Error = null
    },
    setError(state, data) {
      state.Loading = false
      state.Error = data
      state.TokenUser = { ...stateInit.TokenUser }
    },
    clearError(state) {
      state.Error = null
    },
    setLogout(state) {
      state.Loading = false
      state.Error = null
      state.TokenUser = { ...stateInit.TokenUser }
    }
  },
  actions: {
    authLogin(context, payload) {
      // 로그인 처리

      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)

      /* RestApi 호출 */
      api
        .post('/serverApi/auths/token', payload)
        .then(response => {
          const token = response.headers.token
          const decodedToken = jwtDecode(token)

          // 정상인 경우 처리
          context.commit('setLoading', false)
          context.commit('setTokenUser', decodedToken)
        })
        .catch(error => {
          // 에러인 경우 처리
          context.commit('setLoading', false)
          context.commit('setError', error)
          console.log(payload)
        })
    },
    async authLogout(context) {
      // 로그아웃 처리

      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      }, 1000) // 처리 시간을 1초로 주었다.
    },
    authTokenUser(context, payload) {
      // 토큰사용자 설정
      const decodedToken = jwtDecode(payload)
      context.commit('setTokenUser', decodedToken)
    }
  }
}
