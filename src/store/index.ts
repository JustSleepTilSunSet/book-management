import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UploadBookInfo: [] as any
  },
  getters: {
    getbookInfo (state) {
      return state.UploadBookInfo;
    }
  },
  mutations: {
    setBookInfo(state, payload) {
      state.UploadBookInfo.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
