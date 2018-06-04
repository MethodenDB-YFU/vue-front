import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import method from './method'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    method: method,
    user: user,
    shared: shared
  }
})
