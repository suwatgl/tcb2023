import AuthService from '../_services/auth.service'
import User from '../_models/user'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? {
      status: {
        loggedIn: true,
      },
      user: user,
    }
  : {
      status: {
        loggedIn: false,
      },
      user: new User('Guest', 'guest@srru.ac.th', '', 'Guest'),
    }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
