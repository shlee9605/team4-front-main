import api from '../apiUtil'

// 초기값 선언
const stateInit = {
    ProfileUser: {
        Department: {
            id: null,
            name: null
        },
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        role: null,
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
        ProfileUser: { ...stateInit.ProfileUser },
        UpdatedResult: null,
        InputMode: null // 입력모드 (보기: show, 수정: update)
    },
    getters: {
        ProfileUser: state => state.ProfileUser,
        ProfileUserUpdatedResult: state => state.UpdatedResult,
        ProfileInputMode: state => state.InputMode
    },
    mutations: {
        setProfileUser(state, data) {
            state.ProfileUser = data
        },
        setUpdatedResult(state, data) {
            state.UpdatedResult = data
        },
        setInputMode(state, data) {
            state.InputMode = data
        }
    },
    actions: {
        // 초기화
        actProfileUserInit(context, payload) {
            context.commit('setProfileUser', { ...stateInit.ProfileUser })
        },
        // 입력모드
        actProfileUserInputMode(context, payload) {
            context.commit('setInputMode', payload)
        },
        // 프로필 정보 조회
        actProfileUserInfo(context, payload) {
            // 상태값 초기화
            context.commit('setProfileUser', { ...stateInit.ProfileUser })

            /* RestAPI 호출 */
            api
                .get(`/serverApi/profile/${payload}`)
                .then(response => {
                    const profileuser = response && response.data
                    context.commit('setProfileUser', profileuser)
                })
                .catch(error => {
                    // 에러인 경우 처리
                    console.error('ProfileUserInfo.error', error)
                    context.commit('setProfileUser', -1)
                })
        },
        // 프로필 정보 수정
        actProfileUserUpdate(context, payload) {
            // 상태값 초기화
            context.commit('setUpdatedResult', null)
            console.log(payload)

            /* RestAPI 호출 */
            api
                .put(`/serverApi/profile/${payload.id}`, payload)
                .then(response => {
                    const updatedResult = response && response.data && response.data.updatedCount

                    context.commit('setUpdatedResult', updatedResult)
                })
                .catch(error => {
                    // 에러인 경우 처리
                    console.error('ProfileUserUpdate.error', error)
                    context.commit('setUpdatedResult', -1)
                })
        }
    }
}
