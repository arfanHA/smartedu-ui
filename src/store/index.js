import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progressStatus: false,
  },
  mutations: {
    progressFunctionOn(state, status) {
      state.progressStatus = status;
  },
  },
  actions: {
  },
  modules: {
  }
})
