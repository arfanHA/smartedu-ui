import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    progressStatus: false,
    kelasSemesterData: {},
    ujianData: null
  },
  getters:{
    token: state => state.token,
  },
  mutations: {
    progressFunctionOn(state, status) {
      state.progressStatus = status;
    },
    token(state,payload){
      state.token = payload;
    },
    setKelasSemesterData(state, data){
      state.kelasSemesterData = data;
    },
    setUjianData(state, data){
      state.ujianData = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
