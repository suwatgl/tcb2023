import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
// import { image } from './image.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    // image
  },
})
