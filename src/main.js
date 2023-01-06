import Vue from 'vue'
import VueX from 'vuex'
import VueAxios from 'vue-axios'
import Toast from 'vue-toastification'
import axios from './plugins/axios'
import routes from './config/AppRoutes'
import store from './_store'
import { ValidationObserver, ValidationProvider, configure, extend, localize } from 'vee-validate'
import th from 'vee-validate/dist/locale/th.json'
import * as rules from 'vee-validate/dist/rules'

// plugins
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueInsProgressBar from 'vue-ins-progress-bar'
import VueEventCalendar from 'vue-event-calendar'
import VueSparkline from 'vue-sparklines'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vueditor from '@agametov/vueditor'
import VueHljs from 'vue-hljs'
import hljs from 'highlight.js'
import VueSweetalert2 from 'vue-sweetalert2'
import VueNotification from 'vue-notification'
import VuePanel from './plugins/panel/'
import VueDateTimePicker from 'vue-bootstrap-datetimepicker'
import VueSelect from 'vue-select'
import VueDatepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js'
import VueMaskedInput from 'vue-maskedinput'
import VueInputTag from 'vue-input-tag'
import VueSlider from 'vue-slider-component'
import VueGoodTable from 'vue-good-table'
import VueGoodTablePlugin from 'vue-good-table'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueColorpicker from 'vue-pop-colorpicker'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import DateRangePicker from 'vue2-daterange-picker'
import Loading from 'vue-loading-overlay'

// plugins css
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'nvd3/build/nv.d3.min.css'
import 'vue-event-calendar/dist/style.css'
import 'vue-hljs/dist/style.css'
import '@agametov/vueditor/dist/style/vueditor.min.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'flag-icon-css/css/flag-icons.min.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'vue-select/dist/vue-select.css'
import 'vue-slider-component/theme/antd.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue-toastification/dist/index.css'

// color admin css
import './scss/vue.scss'
import 'bootstrap-social/bootstrap-social.css'

import App from './App.vue'
import moment from 'moment'
import VueMoment from 'vue-moment'
require('moment/locale/th')
moment.locale('th')

Vue.config.productionTip = false

Vue.use(VueX)
Vue.use(VueAxios, axios)
Vue.use(Toast)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueNVD3)
Vue.use(VueEventCalendar, {
  locale: 'th',
})
Vue.use(VueSparkline)
Vue.use(Vueditor)
Vue.use(VueHljs, { hljs })
Vue.use(VueSweetalert2)
Vue.use(VueNotification)
Vue.use(VuePanel)
Vue.use(VueDateTimePicker)
Vue.use(VueGoodTable)
Vue.use(VueGoodTablePlugin)
Vue.use(VueColorpicker)
Vue.use(Loading)
Vue.use(VueMoment, { moment })
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
  },
})
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '3px',
})
Vue.component('v-select', VueSelect)
Vue.component('datepicker', VueDatepicker)
Vue.component('masked-input', VueMaskedInput)
Vue.component('input-tag', VueInputTag)
Vue.component('vue-slider', VueSlider)
Vue.component('vue-custom-scrollbar', VueCustomScrollbar)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-range-picker', DateRangePicker)
Vue.component(VueCountdown.name, VueCountdown)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
extend('citizen_id_format', (value) => {
  var dateformat = /^[0-9]{1}[/-][0-9]{4}[/-][0-9]{5}[/-][0-9]{2}[/-][0-9]{1}$/g
  if (dateformat.test(value)) {
    // let id = value.replace('-', '')
    // let i
    // let sum = 0
    // console.log(id)
    // for (i = 0, sum = 0; i < 12; i++) {
    //   sum += Number.parseInt(id.charAt(i)) * (13 - i)
    // }
    // const checkSum = (11 - (sum % 11)) % 10
    // if (checkSum === Number.parseInt(id.charAt(12))) {
    return true
    // }
    // return 'เลขบัตรประจำตัวประชาชนไม่ถูกต้อง กรุณาตรวจสอบ'
  }
  return 'กรุณาป้อนในรูปแบบ 9-9999-99999-99-9'
})
extend('date_format_en', (value) => {
  var dateformat = /^[0-9]{4}[/-][0-9]{2}[/-][0-9]{2}$/g
  if (dateformat.test(value)) {
    return true
  }
  return 'กรุณาป้อนวันที่ในรูปแบบ yyyy-mm-dd'
})
extend('date_format_th', (value) => {
  var dateformat = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g
  if (dateformat.test(value)) {
    value = value.substr(0, 6) + (parseInt(value.substr(6)) - 543).toString()
    if (moment(value, 'DD/MM/YYYY', true).isValid()) {
      return true
    }
    return 'วันที่ไม่ถูกต้อง กรุณาตรวจสอบ'
  }
  return 'กรุณาป้อนวันที่ในรูปแบบ dd/mm/yyyy'
})
extend('datetime_format_th', (value) => {
  var dateformat = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}$/g
  if (dateformat.test(value)) {
    value = value.substr(0, 6) + (parseInt(value.substr(6, 4)) - 543).toString() + value.substr(10)
    if (moment(value, 'DD/MM/YYYY HH:mm:ss', true).isValid()) {
      return true
    }
    return 'วันที่เวลาไม่ถูกต้อง กรุณาตรวจสอบ'
  }
  return 'กรุณาป้อนวันที่เวลาในรูปแบบ dd/mm/yyyy hh:mi:ss'
})
extend('float_money', (value) => {
  var dateformat = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/g
  if (dateformat.test(value)) {
    return true
  }
  return 'กรุณาป้อนวันที่ในรูปแบบ #.##'
})
localize('th', th)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
})

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/user/login-v3']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    next('/user/login-v3')
  } else {
    next()
  }
})

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
