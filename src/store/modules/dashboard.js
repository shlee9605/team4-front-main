import api from '../apiUtil'

const stateInit = {
  Dashboard: {
    id: null,
    deviceId: null,
    productId: null,
    fair: null,
    dice: null,
    color: null,
    createdAt: null,
    updateAt: null
  }
}

export default {
  state: {
    Dashboard: { ...stateInit.Dashboard },
    UpdatedResult: null
  },
  getters: {
    Dashboard: state => state.Dashboard,
    DashboardUpdatedResult: state => state.UpdatedResult
  },
  mutations: {
    setDashboard(state, data) {
      state.Dashboard = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    }
  },
  actions: {
    // edukit 데이터 조회
    actDashboardInfo(context, payload) {
      context.commit('setDashboard', { ...stateInit.Dashboard })

      /* RestAPI 호출 */
      api
        .get(`/serverApi/products/${payload}`)
        .then(response => {
          const dashboard = response && response.data
          // console.log("response data",dashboard)
          context.commit('setDashboard', dashboard)
        })
        .catch(error => {
          console.error('Dashboard.error', error)
          context.commit('Dashboard', [])
        })
    }
  }
}
