import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UploadBookInfo: [] as any,
    bookIdx: 0
  },
  getters: {
    getbookInfo(state) {
      return state.UploadBookInfo;
    },
    getBookIdx(state) {
      return state.bookIdx;
    }
  },
  mutations: {
    setBookInfo(state, payload) {
      state.UploadBookInfo.push(payload);
    },
    updateBookIdx(state) {
      state.bookIdx++;
    }
  },
  actions: {
  },
  modules: {
  }
})
