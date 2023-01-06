// Reference : https://raoulkramer.de/vue-js-axios-interceptors-and-toast-notifications/
import Vue from 'vue'
import axios from 'axios'
import store from '../_store'

axios.interceptors.request.use((request) => {
  // eslint-disable-next-line no-param-reassign
  request.config = {
    showToast: false, // may be overwritten in next line
    ...(request.config || {}),
    start: Date.now(),
  }

  request.params = Object.assign({}, request.params, { user_app_id: 2023 })
  request.baseURL = 'https://canceranywhere.com:8081/api/'

  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    request.headers.Authorization = 'Bearer ' + user.accessToken
  }

  if (request.config.showToast) {
    // eslint-disable-next-line no-param-reassign
    request.config.requestToastId = Vue.$toast(request.config.requestToast.title)
  }

  return request
})

axios.interceptors.response.use(
  (response) => {
    // const now = Date.now();
    const request = response.config
    // console.info(`Api Call ${request.url} took ${now - request.config.start}ms`);

    if (request.config.requestToastId) {
      Vue.$toast.dismiss(request.config.requestToastId)
    }

    if (request.config.showToast && request.config.responseToast) {
      Vue.$toast(request.config.responseToast.title)
    }
    return response
  },
  (error) => {
    Vue.$toast.error(error.response.data.message)

    if (error.response.status === 401) {
      store.dispatch('auth/logout')
      // window.location = '/tcb2023/#/user/login-v3'
    } else {
      return Promise.reject(error)
    }
  }
)

export default axios
