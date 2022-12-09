import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    Department: {
      id: null,
      name: null,
    },
    id: null,
    departmentId: null,
    name: null,
    userid: null,
    password: null,
    role: '대기',
    img: null,
    email: null,
    phone: null,
    updatedPwDate: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null // 입력모드 (등록: insert, 수정: update)
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 리스트 조회
    actUserList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/users', { params: payload })
        .then(response => {
          const userList = response && response.data && response.data.rows
          context.commit('setUserList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setUserList', [])
        })
    },
    // 로그인페이지에서 회원가입
    actUserSignUp(context, payload) {
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */
      api
        .post('/serverApi/auths/signup', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 유저목록에서 신규 등록
    actUserInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */
      api
        .post('/serverApi/users', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    },
    // 입력모드
    actUserInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      /* RestAPI 호출 */
      api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setUser', user)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInfo.error', error)
          context.commit('setUser', -1)
        })
    },
    // 수정
    actUserUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)
      console.log(payload)

      /* RestAPI 호출 */
      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          console.log(response.data.updatedCount)
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actUserDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/users/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
