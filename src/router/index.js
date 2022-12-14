import jwtDecode from 'jwt-decode'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: { permission: true, edukitParams: true }
      },
      {
        path: '/dashboard',
        component: () => import('../views/dashboard'),
        meta: { permission: true, edukitParams: true }
      },
      {
        path: '/department',
        component: () => import('../views/department'),
        meta: { permission: false, edukitParams: true }
      },
      {
        path: '/user',
        component: () => import('../views/user'),
        meta: { permission: false, edukitParams: true }
      },
      {
        path: '/edukit/:depCode/:depTopic',
        component: () => import('../views/edukit/index.vue'),
        meta: { permission: true, edukitParams: false }
      },
      {
        path: '/profile',
        component: () => import('../views/profile'),
        meta: { permission: true, edukitParams: true }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../views/auth'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/login'),
        meta: { header: false, noLogin: true, permission: true, edukitParams: true }
      },
      {
        path: '/auth/logout',
        component: () => import('../views/auth/logout'),
        meta: { header: false, noLogin: true, permission: true, edukitParams: true }
      },
      {
        path: '/NotFound',
        component: () => import('../components/NotFound.vue'),
        meta: { header: false, edukitParams: true }
      }
    ]
  },
  {
    path: '*',
    component: () => import('../components/NotFound.vue'),
    meta: { header: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach(async (to, from, next) => {
  const noLogin = to.meta.noLogin // 이동할 페이지에서 로그인 허용여부 확인
  const permission = to.meta.permission // 이동할 페이지에서 권한 확인
  const edukitParams = to.meta.edukitParams

  if (noLogin === true) {
    // 로그인이 필요없는 페이지는 그냥 이동
    next()
  } else {
    // 로그인이 필요한 페이지는 토큰 체크 후 통과 여부 결정

    // localStorage에서 토큰 추출
    const token = window.localStorage.getItem('token')

    try {
      const decodedToken = jwtDecode(token) // 토큰디코딩
      const today = new Date() // 오늘날짜
      const expDate = new Date(decodedToken.exp * 1000) // 토큰에서 만료일추출

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우

        // tokenUser정보가 없어진 경우 다시 갱신한다.
        const tokenUser = store.getters['TokenUser']
        if (!tokenUser || !tokenUser.id > 0) {
          store.dispatch('authTokenUser', token)
        }

        // 처리를 다 했으면 가던길 가자
        next()
      } else {
        // 토큰이 만료된 경우
        next('/auth/login') // 로그인 페이지로 이동(여기에서 토큰을 삭제해준다.)
      }
    } catch (err) {
      // 토큰 추출이 실패한 경우에 대한 처리
      next('/auth/login') // 로그인 페이지로 이동
    }
  }

  if (permission === true) {
    // 권한이 필요없는 페이지는 그냥 이동
    next()
  } else {
    // 권한이 필요한 페이지는 유저의 role 체크 후 통과 여부 결정
    const tokenUser = store.getters['TokenUser']

    try {
      if (tokenUser.role == '팀장' || tokenUser.role == 'admin') {
        next() // admin이나 팀장은 이동하던 페이지로 이동
      } else {
        next('/') // 팀원은 홈으로 이동
      }
    } catch (err) {
      next('/') // 홈으로 이동
    }
  }

  if (edukitParams === true) {
    // edukit관련 페이지가 아닐경우 그냥 이동
    next()
  } else {
    // 등록되어 있는 모든 부서 code, topic을 가져와서 URL에 들어있는 params값과 비교하여 통과여부 결정
    const departmentList = store.getters['DepartmentList']
    let allCodes = []
    let allTopic = []

    // URL params에 있는 code, topic 값 가져오기
    const paramsCode = to.params.depCode
    const paramsTopic = to.params.depTopic

    // 모든 code, topic 가져오기
    for (const indx in departmentList) {
      allCodes.push(departmentList[indx].code)
      allTopic.push(departmentList[indx].topic)
    }

    // code 또는 topic 중 하나라도 없는 값이면 NOT FOUND 페이지로 이동
    // 통과될경우 가던 페이지로 이동
    if (!allCodes.includes(paramsCode) || !allTopic.includes(paramsTopic)) {
      next('/NotFound')
    } else {
      next()
    }
  }
})

export default router
