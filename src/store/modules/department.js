import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Department: {
    id: null,
    name: null,
    code: null,
    description: null,
    host: null,
    port: null,
    path: null,
    topic: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    DepartmentList: [],
    Department: { ...stateInit.Department },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null // 입력모드 (등록: insert, 수정: update)
  },
  getters: {
    DepartmentList: state => state.DepartmentList,
    Department: state => state.Department,
    DepartmentInsertedResult: state => state.InsertedResult,
    DepartmentUpdatedResult: state => state.UpdatedResult,
    DepartmentDeletedResult: state => state.DeletedResult,
    DepartmentInputMode: state => state.InputMode
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data
    },
    setDepartment(state, data) {
      state.Department = data
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
    // 부서 리스트 조회
    actDepartmentList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/departments', { params: payload })
        .then(response => {
          const departmentList = response && response.data && response.data.rows

          // 여러 topic이 있을 경우 콤마를 슬래시로 바꿔서
          // 헤더에 'topic1/topic2' 식으로 호출되게 하기
          for (const indx in departmentList) {
            const repTopic = departmentList[indx].topic.replaceAll(',', '-')
            departmentList[indx].topic = repTopic
          }
          context.commit('setDepartmentList', departmentList)
        })
        .catch(error => {
          console.error('DepartmentList.error', error)
          context.commit('setDepartmentList', [])
        })
    },
    // 부서 등록
    actDepartmentInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      const newTopic = payload.topic.split(',') // ['a', ' b'] array형식으로 반환

      // 빈 스페이스가 있을 경우 없애기 위한 전처리
      let newTopicTrim = []
      for (const indx in newTopic) {
        const eachNewTopic = newTopic[indx].trim()
        newTopicTrim.push(eachNewTopic)
      }
      payload.topic = newTopicTrim.toString() // 백에 보내주기 위해 string형식으로 변환

      /* RestAPI 호출 */
      api
        .post('/serverApi/departments', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
          console.log(insertedResult)
        })
        .catch(error => {
          console.error('DepartmentInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 부서정보 초기화
    actDepartmentInit(context, payload) {
      context.commit('setDepartment', { ...stateInit.Department })
    },
    // 입력모드 설정
    actDepartmentInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 부서 상세정보 조회
    actDepartmentInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDepartment', { ...stateInit.Department })

      /* RestAPI 호출 */
      api
        .get(`/serverApi/departments/${payload}`)
        .then(response => {
          const department = response && response.data
          context.commit('setDepartment', department)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeptInfo.error', error)
          context.commit('setDept', -1)
        })
    },
    actDepartmentUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      const newTopic = payload.topic.split(',') // ['a', ' b'] array형식으로 반환

      // 빈 스페이스가 있을 경우 없애기 위한 전처리
      let newTopicTrim = []
      for (const indx in newTopic) {
        const eachNewTopic = newTopic[indx].trim()
        newTopicTrim.push(eachNewTopic)
      }
      payload.topic = newTopicTrim.toString() // 백에 보내주기 위해 string형식으로 변환

      /* RestAPI 호출 */
      api
        .put(`/serverApi/departments/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actDepartmentDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/departments/${payload}`)
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
