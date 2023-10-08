import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    UploadBookInfo: '新書發表!'
  },
  getters: {
  },
  mutations: {
    setBookInfo(state,payload) {
      state.UploadBookInfo = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
